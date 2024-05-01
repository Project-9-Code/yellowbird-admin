/**
 * ! Executing this script will delete all data in database and seed it with intro lesson.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { v4 as uuid } from "uuid";

const introUserId = uuid();
const introCourseId = uuid();
const introLessonId = uuid();

const main = async () => {
  const seed = await createSeedClient({ dryRun: true });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Create intro user
  /*await seed.user([{
    id: introUserId,
    name: "Samantha Taylor",
    organization: "Yellowbird",
    email: "intro@yellowbird.com",
    avatar_url: "https://s3-alpha-sig.figma.com/img/a122/e47f/b96ab35580fed3a624bcb755939a3c62?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EIUIc~dbpR4tIFVwqgN9ulbJ1-7lVD-MsAT0U-8GS7m6ciSZfSiniq77WOqMeehB~Sfawgo9~5czRW3bzCdPplpbenWE8hAQMx0s-i18JKUEbRihdJjJJBA1HOwNonPCSgcf1QSx0xVv460P8sxMICU7073lAkM8hcecYJeC8Zf02ZKeg064PkxJtg8dVjOHeXYi8CJVpYu4uHMAqtlz9iHqeFJU7OCNW7V6SWa62cr1f1cZS80bYH84JQ6~H79srNAcFCG7JX1kboZ7N5FlcAeC2QyybQ31t8TR3cErUdqK5D5vWJoNRObJoHhtRTIDZCxpz3bZSSYkfZasYvwcZA__"
  }]);

  // Create intro course
  await seed.course([{
    id: introCourseId,
    title: "Intro to Yellowbird",
    description: "You will learn the difference between a credit card and a debit card. They look the same, but have different purposes.",
    created_by: introUserId,
    active_lessons: 0,
    archived_lessons: 0,
    draft_lessons: 0,
  }]);

  // Create intro lesson
  await seed.lesson([{
    id: introLessonId,
    title: "Intro to Yellowbird",
    description: "You will learn the difference between a credit card and a debit card. They look the same, but have different purposes.",
    course_id: introCourseId,
    author: introUserId,
    order: 0,
    tags: ["intro"],
    blocks: JSON.stringify([
      {
        id: "0",
        type: "TEXT",
        order: 0,
        screenContent: "Underwriting is an evaluation done by the insurance company to see if it’s worth the risk of providing insurance coverage. In other words, can the insurance company make money from the policy?"
      },
      {
        id: "1",
        type: "MEDIA",
        order: 1,
        mediaUrl: "https://firebasestorage.googleapis.com/v0/b/yellowbird-4e1b8.appspot.com/o/public%2Flesson%2Fblock2%2Fmedia?alt=media&token=3e3bccd2-80cc-44f6-aadf-f05bbada65d5",
        screenContent: "Some screens will have new words. User can tap the highlighted word to reveal a card overlay."
      },
      {
        id: "2",
        type: "CHOICE",
        order: 2,
        question: "A bear market is when the market is showing a steady decline over a period of 30-days?",
        answer_options: ["True", "False"],
        answers: ["True"],
        points: 10
      }
    ]),
  }]);*/

  process.exit();
};

main();