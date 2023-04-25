import { tokenizer, tokenizer_sentence } from "..";
import { WordTokenizer, JaroWinklerDistance, DamerauLevenshteinDistance } from "natural";
import prisma from "./prisma";
import { findBestMatch } from "string-similarity";
import { distance as levenshteinDistance } from 'fastest-levenshtein';
import { compareTwoStrings } from 'string-similarity';

interface Match { sentence: string; score: number; }

function tokenizeText(text: string): string[][] {
  const sentences: string[] = tokenizer_sentence.tokenize(text.toLowerCase());
  const words: string[][] = sentences.map((sentence: string) => tokenizer.tokenize(sentence));
  return words;
}

async function* Generator_Sentence() {
  const batchSize = 100000;
  let cursor: number | undefined = undefined;
  while (true) {
    const sentences: any = await prisma.answer.findMany({ take: batchSize, skip: cursor ?? 0, cursor: cursor ? { id: cursor } : undefined, orderBy: { id: 'asc' } });
    if (!sentences.length) break;
    yield sentences;
    cursor = sentences[sentences.length - 1].id;
  }
}

function findClosestMatch(query: string, sentences: string[]): { sentence: string, query: string } | undefined {
  // Приводим запрос и предложения к нижнему регистру
  query = query.toLowerCase();
  const sentencesLower = sentences.map(sentence => sentence.toLowerCase());
  // Разбиваем запрос на отдельные слова
  const tokenizer = new WordTokenizer();
  const queryWords = tokenizer.tokenize(query);
  // Извлекаем контекст из запроса пользователя
  const contextWords = queryWords;
  // Вычисляем схожесть между каждым предложением и запросом,
  // используя функции JaroWinklerDistance, LevenshteinDistance и cosineSimilarity
  const matches: Match[] = sentencesLower.map(sentenceLower => {
    const jaroWinklerScore = JaroWinklerDistance(query, sentenceLower, {} );
    const levenshteinScore = 1 / (levenshteinDistance(query, sentenceLower) + 1);
    const cosineScore = compareTwoStrings(query, sentenceLower);
    const score = (jaroWinklerScore + levenshteinScore + cosineScore) / 3;
    return { sentence: sentenceLower, score: score };
  });
  // Сортируем результаты по убыванию схожести
  matches.sort((a, b) => b.score - a.score);
  // Находим наилучшее совпадение, учитывая контекст
  const bestMatch = matches.find(match => {
    const matchWords = tokenizer.tokenize(match.sentence);
    const intersection = matchWords.filter(word => contextWords.includes(word));
    return intersection.length > 0;
  });
  // Если нашлось хотя бы одно совпадение, возвращаем его
  if (bestMatch) { return { sentence: bestMatch.sentence, query }; } else { return undefined; }
}
/*function findClosestMatch(query: string, sentences: string[]): { sentence: string, query: string } | undefined {
  // Приводим запрос и предложения к нижнему регистру
  query = query.toLowerCase();
  const sentencesLower = sentences.map(sentence => sentence.toLowerCase());
  
  // Разбиваем запрос на отдельные слова
  const tokenizer = new WordTokenizer();
  const queryWords = tokenizer.tokenize(query);
  
  // Извлекаем контекст из запроса пользователя
  const contextWords = queryWords;
  // Вычисляем схожесть между каждым предложением и запросом,
  // используя функцию JaroWinklerDistance из модуля "natural"
  const matches: Match[] = sentencesLower.map(sentenceLower => ({
    sentence: sentenceLower,
    score: JaroWinklerDistance(query, sentenceLower, {})
  }));

  // Отбираем только те предложения, которые имеют сходство выше некоторого порога
  const threshold = 0.1;
  const filteredMatches = matches.filter(match => match.score >= threshold);

  // Если нет ни одного предложения, которое имеет достаточное сходство с запросом,
  // возвращаем undefined
  if (filteredMatches.length === 0) {
    return undefined;
  }
  // Сортируем результаты по убыванию схожести
  matches.sort((a, b) => b.score - a.score);
  // Находим предложение с наибольшим сходством
  const bestMatch = filteredMatches.reduce((prev, current) => {
    return prev.score > current.score ? prev : current;
  });
  // Если нашлось хотя бы одно совпадение, возвращаем его
  if (bestMatch) {
    return { sentence: bestMatch.sentence, query };
    } else {
    return undefined;
    }
  }*/

async function processText(text: string): Promise<{ sentence: string, query: string }[]> {
  const tokenizedText = tokenizeText(text);
  const generator = Generator_Sentence();
  let result: { sentence: string, query: string }[] = [];
  for await (const sentences of generator) {
    const similarities: any = tokenizedText.map(query => findClosestMatch(query.join(" "), sentences.map((sent:any) => sent.qestion))).filter(Boolean);
    if (!similarities.length) continue;
    const similaritiesWithQuery = similarities.map((similarity: { sentence: string, query: string }) => ({ sentence: similarity.sentence, query: similarity.query }));
    result = result.concat(similaritiesWithQuery);
  }
  return result;
}

async function generateBestSentences(text: string): Promise<{ sentence: string, query: string }[]> {
    const search_all = await processText(text);
    const uniqueQueries = Array.from(new Set(search_all.map(item => item.query)));
    const bestSentences: { sentence: string, query: string }[] = [];
    for (const query of uniqueQueries) {
      const sentences = search_all.filter(item => item.query === query).map(item => item.sentence);
      const bestSentence = findClosestMatch(query, sentences)?.sentence;
      if (bestSentence) { bestSentences.push({ query, sentence: bestSentence }); }
    }
    return bestSentences;
}

async function Engine_Generate_Last_Age(res: { text: string, answer: string, info: string, status: boolean}) {
  const data_old = Date.now()
  const search_best = await generateBestSentences(res.text);
  const answers = [];
  for (const item of search_best) {
      const cond = tokenizer.tokenize(item.sentence).length > 1 ? { qestion: { contains: item.sentence } } : { qestion: item.sentence }
      const answer = await prisma.answer.findMany({ where: cond, take: 100, orderBy: [ {answer: 'desc'}, {qestion: 'asc'} ] });
      if (answer.length > 0) {
          const randomIndex = Math.floor(Math.random() * answer.length);
          answers.push({ id: answer[randomIndex].id, input: item.query, qestion: answer[randomIndex].qestion, answer: answer[randomIndex].answer, crdate: new Date(answer[randomIndex].crdate) });
      }
  }
  if (answers.length > 0) {
      res.answer =  answers.length == 1 ? answers.map(answer => `${answer.answer}\n\n`).join('') : answers.map(answer => `${answer.input}: \n${answer.answer}\n\n`).join('')
      res.info = ` Получено сообщение: [${res.text}] \n Исправление ошибок: [${answers.map(answer => `${answer.id} --> ${answer.qestion}`).join('')}] \n Сгенерирован ответ: [${answers.map(answer => `${answer.id} <-- ${answer.answer}`).join('')}] \n Затраченно времени: [${(Date.now() - data_old)/1000} сек.] \n Откуда ответ: 	     [${"MultiBoost"}] \n\n`
      res.status = true
  }
  return res
}

export default Engine_Generate_Last_Age;