INSERT INTO auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,invited_at,confirmation_token,confirmation_sent_at,recovery_token,recovery_sent_at,email_change_token_new,email_change,email_change_sent_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,phone_change,phone_change_token,phone_change_sent_at,email_change_token_current,email_change_confirm_status,banned_until,reauthentication_token,reauthentication_sent_at,is_sso_user,deleted_at,is_anonymous) VALUES ('3dcce8b2-d93e-5155-9a50-a529057e4a9a', '99a49f5f-4019-4a04-9cb5-52e1a4115d39', 'Ipsa nihil sed gaudeat successiones oreste res.', 'Developer', 'samantha@yellowbird.com', '08*H*RCx2E$nH', '2020-02-10T13:34:50.000Z', '2020-03-07T03:00:57.000Z', 'f71ecf95-7766-52eb-9128-7f41ba94a019', '2020-12-28T11:35:00.000Z', '0911f256-347e-5563-a9fc-69f423a36eab', '2020-01-09T00:49:11.000Z', '9f126563-dfc1-5d22-acf4-882145eb1257', 'Oswald_Mueller78665@memorable-spur.info', '2020-10-02T09:19:38.000Z', '2020-08-16T19:13:05.000Z', '{"Dolorum":"Inor placet si"}', '{"full_name":"Samantha Taylor","organization":"Yellowbird","avatar_url":"https://s3-alpha-sig.figma.com/img/a122/e47f/b96ab35580fed3a624bcb755939a3c62?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EIUIc~dbpR4tIFVwqgN9ulbJ1-7lVD-MsAT0U-8GS7m6ciSZfSiniq77WOqMeehB~Sfawgo9~5czRW3bzCdPplpbenWE8hAQMx0s-i18JKUEbRihdJjJJBA1HOwNonPCSgcf1QSx0xVv460P8sxMICU7073lAkM8hcecYJeC8Zf02ZKeg064PkxJtg8dVjOHeXYi8CJVpYu4uHMAqtlz9iHqeFJU7OCNW7V6SWa62cr1f1cZS80bYH84JQ6~H79srNAcFCG7JX1kboZ7N5FlcAeC2QyybQ31t8TR3cErUdqK5D5vWJoNRObJoHhtRTIDZCxpz3bZSSYkfZasYvwcZA__"}', 't', '2020-06-06T05:41:47.000Z', '2020-03-11T02:10:13.000Z', DEFAULT, '2020-03-11T02:53:19.000Z', DEFAULT, DEFAULT, '2020-12-24T11:30:02.000Z', DEFAULT, DEFAULT, '2020-06-10T05:08:46.000Z', DEFAULT, '2020-06-26T17:49:35.000Z', DEFAULT, '2020-03-23T14:25:27.000Z', DEFAULT);
INSERT INTO public.lessons (id,course,author,title,lesson_description,lesson_order,tags,created_at,updated_at,created_by,updated_by) VALUES ('bc412d0e-41e2-4c7f-a34c-e5824f7a4802', NULL, NULL, 'Intro to Yellowbird', 'You will learn the difference between a credit card and a debit card. They look the same, but have different purposes.', 0, '{"intro"}', DEFAULT, DEFAULT, NULL, NULL);
INSERT INTO public.lesson_blocks (id,lesson,block_type,media_url,screen_content,question,answers,answer_options,points,block_order,created_at,updated_at,created_by,updated_by) VALUES ('58852d54-d81d-55f9-8cf9-97b037fdde2c', 'bc412d0e-41e2-4c7f-a34c-e5824f7a4802', 'TEXT', 'https://www.example.com/document9', 'Underwriting is an evaluation done by the insurance company to see if it’s worth the risk of providing insurance coverage. In other words, can the insurance company make money from the policy?', 'Have you ever skydived?', '{"Postea quietae es efficitiar iderrem expetu, ea bonum id referitat non quae es."}', '{"Erri quorum hoc parumque legeratrum."}', 56659, 0, DEFAULT, DEFAULT, NULL, NULL), ('cd59c7f8-5ecb-5a3d-bc1b-973a4b4074d2', 'bc412d0e-41e2-4c7f-a34c-e5824f7a4802', 'MEDIA', 'https://firebasestorage.googleapis.com/v0/b/yellowbird-4e1b8.appspot.com/o/public%2Flesson%2Fblock2%2Fmedia?alt=media&token=3e3bccd2-80cc-44f6-aadf-f05bbada65d5', 'Some screens will have new words. User can tap the highlighted word to reveal a card overlay.', 'What is your favorite sports team?', '{"Sic vero cordans domindivit quia tempus, detracta eos te nec ab domo est natur."}', '{"Am entur viventur sic tale plusque."}', 52054, 1, DEFAULT, DEFAULT, NULL, NULL), ('50629371-3063-53ab-aec2-1777c024c1c7', 'bc412d0e-41e2-4c7f-a34c-e5824f7a4802', 'CHOICE', 'https://www.example.com/document10', 'Solidita beate desissim et quid inquit ii.', 'A bear market is when the market is showing a steady decline over a period of 30-days?', '{"True"}', '{"True","False"}', 10, 2, DEFAULT, DEFAULT, NULL, NULL);
INSERT INTO public.courses (id,title,course_description,cover_photo_url,active_lessons,archived_lessons,draft_lessons,created_at,updated_at,created_by,updated_by) VALUES ('6c829708-2edb-4038-b5ca-4bf179c433f7', 'Intro to Yellowbird', 'You will learn the difference between a credit card and a debit card. They look the same, but have different purposes.', 'https://loremflickr.com/640/480', 0, 0, 0, DEFAULT, DEFAULT, NULL, NULL);
UPDATE public.lessons SET course = '6c829708-2edb-4038-b5ca-4bf179c433f7', author = '99a49f5f-4019-4a04-9cb5-52e1a4115d39' WHERE id = 'bc412d0e-41e2-4c7f-a34c-e5824f7a4802';
UPDATE public.courses SET created_by = '99a49f5f-4019-4a04-9cb5-52e1a4115d39' WHERE id = '6c829708-2edb-4038-b5ca-4bf179c433f7';
