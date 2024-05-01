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
  await seed.users([{
    id: introUserId,
    email: "samantha@yellowbird.com",
  }]);

  // Create intro course with intro lesson
  await seed.courses([{
    id: introCourseId,
    title: "Intro to Yellowbird",
    course_description: "You will learn the difference between a credit card and a debit card. They look the same, but have different purposes.",
    created_by: introUserId,
    active_lessons: 0,
    archived_lessons: 0,
    draft_lessons: 0,
    lessons: [{
      id: introLessonId,
      title: "Intro to Yellowbird",
      lesson_description: "You will learn the difference between a credit card and a debit card. They look the same, but have different purposes.",
      author: introUserId,
      lesson_order: 0,
      tags: ["intro"],
      lesson_blocks: [{
        block_order: 0,
        block_type: "TEXT",
        screen_content: "Underwriting is an evaluation done by the insurance company to see if it’s worth the risk of providing insurance coverage. In other words, can the insurance company make money from the policy?"
      }, {
        block_type: "MEDIA",
        block_order: 1,
        media_url: "https://firebasestorage.googleapis.com/v0/b/yellowbird-4e1b8.appspot.com/o/public%2Flesson%2Fblock2%2Fmedia?alt=media&token=3e3bccd2-80cc-44f6-aadf-f05bbada65d5",
        screen_content: "Some screens will have new words. User can tap the highlighted word to reveal a card overlay."
      }, {
        block_type: "CHOICE",
        block_order: 2,
        question: "A bear market is when the market is showing a steady decline over a period of 30-days?",
        answer_options: ["True", "False"],
        answers: ["True"],
        points: 10
      }],
    }]
  }]);

  process.exit();
};

main();