import Image from "next/image";
import Link from "next/link";
import lessonsData from "@/data/lessons.json";

interface Props {
  params: Promise<{ lesson: string }>;
}

interface LessonSection {
  time: string;
  title: string;
  color: string;
  content: string[];
}

const lessonSections: Record<string, LessonSection[]> = {
  "1": [
    {
      time: "0:01", title: "Opening", color: "border-l-teal",
      content: [],
    },
    {
      time: "0:02", title: "Presenting", color: "border-l-teal",
      content: [],
    },
    {
      time: "0:06", title: "Karis Circulation", color: "border-l-coral",
      content: [],
    },
    {
      time: "0:07", title: "Guidelines & Limitations", color: "border-l-coral",
      content: [],
    },
    {
      time: "0:08", title: "Mindfulness & Meditation Training", color: "border-l-sky",
      content: [
        "Karis Fellowships is more than an education. We anticipate that regular attendance at the weekly KF meetings will actually change you and set you on a glorious path, the path that God intended for you. At these meetings, you will learn to use tools that will help you in your daily life. One of these tools is the practice of mindfulness and Christian meditation. In Karis Fellowships, mindfulness means that we train our minds to be aware of what is happening inside and around us. In meditation, we train ourselves to rest in stillness and connect with God. It is a kind of waiting before the Lord. Although, to a great extent, we have lost the traditions of mindfulness and meditation in the modern church, Christians have used these practices for centuries to help them walk with God.",
        "Mindfulness and meditation are difficult for everyone. That\u2019s why they are called spiritual disciplines. Disciples are learners, and a discipline is something that you have to learn. Learning any new skill takes time, patience, and practice. Karis Fellowships supports you in the process of learning. Think of your mind as a young puppy learning to sit still on command.",
        "We begin with the 3-Minute Breathing Space. This mindfulness exercise teaches us important skills. First, we learn to give our physical bodies permission to talk to us; second, we learn to notice our breathing; and third, we learn that mindful breathing helps us experience ourselves as unified material and spiritual creatures. The 3-Minute Breathing Space trains us to connect to our breathing when we are under stress and, also, to disconnect from our compulsive judgments, reactions, and stories. We can simply breathe and observe.",
        "Follow these basic instructions as I guide you. When you notice that your mind is drifting, as it certainly will, gently recall your thoughts by observing your breath.",
        "We start with AWARENESS. Prepare your body for mindfulness practice. Sit up straight, if you can. Imagine the crown of your head reaching toward the heavens and your tailbone reaching toward the earth. Lengthen your spine by straightening the back of your neck and drop your chin a little. Plant your feet on the ground or, if you are sitting on the floor, plant your tailbone into the earth. If possible, close your eyes. Then ask yourself: What is my experience right now \u2014 in thoughts, in feelings, and in my body\u2019s sensations? Get to know yourself as you are right now. Observe for thirty seconds, and breathe.",
        "Move to GATHERING. Notice your breathing, just as it is. Notice each in-breath and each out-breath as they follow one after the other. Use your breath as an anchor to bring you into the present moment and to help you find a place of stillness and unbiased awareness. Observe your breathing without judgment and release any thoughts of right or wrong. Breathe and observe for another thirty seconds.",
        "Now move to EXPANDING. Expand your awareness to include a sense of yourself as a composite whole of mind, emotions, and physical sensations, including the part of you that is observing all of those things. Notice how your body moves with each breath. Notice your posture and what your face is doing. Observe and breathe for thirty seconds.",
        "Now pause, and redirect your mind back to the meeting. It takes a long time to learn how to make the most of the 3-Minute Breathing Space, and most of us are still learning. Be kind to yourself as you train and learn.",
        "We practice mindfulness to maintain our awareness of who we are and what we are experiencing in the present moment, no matter what is going on around us. If you haven\u2019t already done so, begin your own daily practice this week, spending one minute on each of the three steps. Try to set aside time in the morning and then again later in the day. It might help to attach this practice to a habit that is already in place. You can practice the 3-Minute Breathing Space using these teaching notes to guide you, or you can download the instructions under the Toolbox menu on the KF website. Alternatively, you can call this meeting\u2019s playback number and follow along with the group again.",
      ],
    },
    {
      time: "0:20", title: "Karis Confession", color: "border-l-violet",
      content: [],
    },
    {
      time: "0:21", title: "Toolbox", color: "border-l-violet",
      content: [
        "We hope that you will review the notes from the KF Introductory Meeting. You can also read the Expanded Version of the introductory lesson to get a more detailed explanation of what we do in KF. Bold print in the body of the text indicates documents, information, and KF tools that are available on the website.",
        "At this point, you might ask yourself the question: How do I know when I am misoriented?",
        "In the KF Introductory Meeting, you learned that in Karis Fellowships we use the term misorientation when referring to our neurotic behaviors and compulsive drives. We often cannot spot the signs that indicate misorientation because our misoriented behaviors and reactions seem so normal to us. When you are misoriented, you are no longer oriented toward God and His design but have oriented toward the demands and pride of the Idol Self. Your habitual ways of thinking, feeling, and reacting have become an autopilot system that short-circuits your ability to make conscious choices and, also, your ability to consider the consequences of the choices you make; you don\u2019t even notice what you are actually doing.",
        "You automatically defend your reactions as justified and rational, and any evidence to the contrary is immediately flushed from your awareness because it doesn\u2019t fit your ideas of right and wrong, good and bad, fair and unfair. When you are misoriented, you become hardened and must engage with life through a closed system that can only filter and evaluate what it already believes and knows.",
        "Judging creates tension and anxiety, and tension and anxiety trigger self-protection. You cannot learn in that environment. In mindfulness training, however, you learn to observe without judgment, which allows real evidence to penetrate your conscious mind. When you stop judging information as good or bad, right or wrong, fair or unfair, you can relax, observe, and learn. Your goal is to stop evaluating and simply observe what is true about yourself in this moment. How misoriented are you?",
        "Your first step toward recognizing misorientation is to notice yourself. You observe what you are doing right now within your own mind and body, and in your choices. With mindful observation, you explore and compare your reactions in similar situations and look for patterns. As you continue in your training, you might also look for signs of positive change. Step by step, you will learn to identify healthy and unhealthy behaviors, feelings, and thoughts. For a moment, you lay aside the idea that others are the cause of your misorientation. You begin to accept that you yourself are the cause.",
        "Feelings seem like a good place to start, but do you know that most of us don\u2019t know what we are actually feeling? We have suppressed our real and, perhaps, unacceptable feelings to prevent them from coming to our awareness. When we were young, we suppressed our feelings to protect our True Self; we now suppress our feelings to protect our Idol Self.",
      ],
    },
    {
      time: "0:30", title: "Sharing", color: "border-l-amber",
      content: [],
    },
    {
      time: "1:00", title: "Bible Teaching", color: "border-l-teal",
      content: [
        "This month we are considering KF Confession 1: We confess that we have worshipped and served an Idol Self that we have created.",
        "How did we turn from the real God who created us and create a god of our own? In the NHG book study, which we all endured together, we learned that our backgrounds, our conflicts about other people, our deep anxiety, and our need for self-confidence all pressed us into seeking an imagined safe place that could only be maintained and defended with certain behaviors. These behaviors seemed to give us some degree of relief from our anxiety, but they still did not provide the security and self-confidence that we dreamed of. We then believed that more would be better, so we took those behaviors to an extreme. We became convinced that if we could perform perfectly, we would have what we seek. That dream hardened into a chronic search for glory, an imagined place of perfect security and effortless superiority. We became completely egocentric in this search. We no longer took any real interest in other people, nor did we notice their struggles with the same problem.",
        "The search for glory uses up a lot of energy. Our goal in Karis Fellowships is to redirect that creative and abundant energy toward our true glory. As we learned in the KF Introductory Meeting, our true glory reveals our original design, and our original design reveals the glory of our Creator. Our glory is this: to fulfill our design as creatures who uniquely represent God\u2019s character in this material world.",
        "How does the Bible first describe our glory? Let\u2019s look at Genesis 1:26\u201328. This translation is from the New American Standard Bible.",
        "\u201CThen God said, \u2018Let Us make man in Our image, according to Our likeness; and let them rule over the fish of the sea and over the birds of the sky and over the cattle and over all the earth, and over every creeping thing that creeps on the earth.\u2019 God created man in His own image, in the image of God He created him; male and female He created them. God blessed them; and God said to them, \u2018Be fruitful and multiply, and fill the earth, and subdue it; and rule over the fish of the sea and over the birds of the sky and over every living thing that moves about on the earth.\u2019\u201D",
        "First, we see in this passage that all human beings are created in God\u2019s image\u2014men and women, boys and girls. Both sexes reveal the image of God. Human beings were designed to offer to this world the likeness of God\u2019s character, trustworthiness, and creative wealth. We are not designed to mold ourselves into an image that we then worship and serve.",
        "Next, we see in this passage that we have work to do. In the KF Introductory Meeting, we learned that Jesus glorified God by finishing His work, and we glorify God by finishing ours. Our job is to rule over other creatures and subdue the material world. In other words, we are called to influence this world according to God\u2019s mercy and truth. Note that we were not designed to rule over each other. That feels a little scary for the neurotic!",
        "Finally, we are designed to be fruitful and multiply. Our ability to create other eternal souls is similar to God\u2019s creative ability. However, unlike God, we cannot do it alone; we need a partner.",
      ],
    },
    {
      time: "1:10", title: "Integration \u2014 FAITH Process", color: "border-l-coral",
      content: [
        "A list of the Fruit of the Spirit is found in Galatians 5:22\u201323. Our goal in Karis Fellowships is to consistently experience and produce this Fruit in our lives, and to do that, we need healing. In the KF meetings, we heal personally and, also, as a group. During this portion of the meeting, we integrate what we have learned so that the Fruit of the Spirit can flow naturally out of our healing.",
        "We will begin with a mindfulness practice that helps us allow our feelings and passing thoughts to come to our awareness without judging or reacting to them. We learn to explore rather than suppress. Nancy calls this practice the FAITH Process. We learn to practice our faith while we feel our feelings.",
        "F is for Feelings\nA is for Awareness without judgment\nI is for Inquiry: What is my body saying?\nT is for Talk to Jesus\nH is for Heal",
        "Here is our integration focus: Consider fulfilling your created design.",
        "Feelings: As you consider fulfilling your created design, how does it feel? Your feelings are yours to teach you about yourself, to guide you, and to train you. They can often be uncomfortable. You can learn to recognize and honor your feelings without allowing them to master you. Recognize with compassion whatever you are experiencing, and breathe.",
        "Awareness without judgment: Graciously allow whatever you are experiencing to rest in your awareness. You might notice a compulsion to push thoughts or feelings away, to judge them, or to justify them. We often flush thoughts or feelings from our awareness before they have a chance to teach us. Observe whatever tension you may be feeling as you consider fulfilling your created design. Feelings and passing thoughts are not right or wrong; they just are. Give yourself permission now to explore them without judgment, and breathe.",
        "Inquiry \u2014 What is my body saying? Breathe, and bring your attention to your body. Notice what it is doing as you consider fulfilling your created design. What sensations are there? Your body is always talking to you. You may not understand its language right now, but you can observe.",
        "Talk to Jesus: You might imagine that you are leaning back in the safe and loving arms of Jesus as together you consider fulfilling your created design. Are your thoughts pleasant, unpleasant, or vague and slippery? Just breathe and observe. What do you believe when you consider your created design? What story do you want to tell?",
        "Heal: God created you to have all of these feelings, and for thousands of years human beings have been feeling like you do when they have considered fulfilling their created design. You can read about that in the Psalms. You are not alone in your feelings. You are a human creature. You can observe and learn something from what you have just experienced.",
      ],
    },
    {
      time: "1:28", title: "Ending Prayer", color: "border-l-sky",
      content: [
        "Dear Father and Creator, We are so grateful for this time together. Hold us in the power of this new understanding as You guide us to our glory and to the truth. Lead us to the next step in our healing this week as we co-labor with You to reorient our lives for a more effective flow and to flourish in our connection with our True Self, with the Creation, and with You, for the glory and honor of our Lord Jesus. Amen.",
      ],
    },
    {
      time: "1:29", title: "Announcements", color: "border-l-amber",
      content: [
        "Karis Fellowships sends out regular emails during the week with portions of the Expanded Version of the KF teaching notes. We call this gift the KF Compass. Please write to admin@karisfellowships.com if you would like to receive these emails.",
      ],
    },
  ],
};

const defaultSections: LessonSection[] = [
  { time: "0:01", title: "Opening", color: "border-l-teal", content: [] },
  { time: "0:02", title: "Presenting", color: "border-l-teal", content: [] },
  { time: "0:06", title: "Karis Circulation", color: "border-l-coral", content: [] },
  { time: "0:07", title: "Guidelines & Limitations", color: "border-l-coral", content: [] },
  { time: "0:08", title: "Mindfulness & Meditation Training", color: "border-l-sky", content: [] },
  { time: "0:20", title: "Karis Confession", color: "border-l-violet", content: [] },
  { time: "0:21", title: "Toolbox", color: "border-l-violet", content: [] },
  { time: "0:30", title: "Sharing", color: "border-l-amber", content: [] },
  { time: "1:00", title: "Bible Teaching", color: "border-l-teal", content: [] },
  { time: "1:10", title: "Integration \u2014 FAITH Process", color: "border-l-coral", content: [] },
  { time: "1:28", title: "Ending Prayer", color: "border-l-sky", content: [] },
  { time: "1:29", title: "Announcements", color: "border-l-amber", content: [] },
];

export default async function LessonPage({ params }: Props) {
  const { lesson } = await params;
  const lessonNumber = lesson.replace("kf", "");
  const num = parseInt(lessonNumber);
  const prevLesson = num > 0 ? num - 1 : null;
  const nextLesson = num < 52 ? num + 1 : null;

  const lessonData = (lessonsData as Record<string, { meetingFile?: string; expandedFile?: string }>)[lessonNumber];
  const sections = lessonSections[lessonNumber] || defaultSections;
  const hasMeetingPdf = lessonData?.meetingFile;
  const hasExpandedPdf = lessonData?.expandedFile;

  return (
    <div className="bg-slate-dark">
      <section className="relative overflow-hidden pt-20">
        <div className="relative h-56 sm:h-64">
          <Image src="/ocean-horizon.jpg" alt="Horizon" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/60 to-slate-dark/30" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-8 pb-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 h-px w-10 bg-teal/60" />
            <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">KF{lessonNumber} Meeting</h1>
            <p className="mt-2 text-white/60">Meeting Version of Teachings</p>
          </div>
        </div>
      </section>

      <section className="px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* PDF download buttons */}
          <div className="mb-10 flex flex-wrap gap-3">
            {hasMeetingPdf && (
              <a
                href={`/docs/lessons/kf${lessonNumber}-meeting.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-teal-hover"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Meeting PDF
              </a>
            )}
            {hasExpandedPdf && (
              <a
                href={`/docs/lessons/kf${lessonNumber}-expanded.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-teal/40 bg-teal/10 px-6 py-3 text-sm font-medium text-teal-light transition-all duration-300 hover:bg-teal/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Expanded PDF
              </a>
            )}
          </div>

          {/* Opening prayer */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <p className="font-serif text-lg italic text-white/70">Karis is an invitation to a relationship based on mutual generosity.</p>
            <p className="mt-4 text-sm italic leading-relaxed text-white/60">
              &ldquo;Search me, O God, and know my heart. Examine me and know my
              thoughts. See if there is any way in me that causes pain, and lead
              me in the ways of eternity.&rdquo;
            </p>
            <p className="mt-2 text-xs text-white/35">Psalm 139:23&ndash;24</p>
          </div>

          {/* Lesson sections */}
          <div className="mt-10 space-y-4">
            {sections.map(({ time, title, color, content }) => (
              <div key={time} className={`border-l-4 ${color} rounded-r-2xl border border-l-4 border-white/[0.06] bg-white/[0.03] p-6`}>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white/60">{time}</span>
                  <h3 className="font-serif text-lg font-semibold text-white">{title}</h3>
                </div>
                {content.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {content.map((paragraph, idx) => (
                      <p key={idx} className="text-sm leading-[1.9] text-white/65 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm italic text-white/30">
                    (This section is led by the facilitator during the live meeting.)
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Recording placeholder */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="font-serif text-lg font-semibold text-white">Recording</h3>
            <p className="mt-2 text-sm text-white/50">
              Audio recording link will be available here.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between">
            {prevLesson !== null ? (
              <Link href={`/kf/meetings/kf${prevLesson}`} className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white/60 transition-all duration-300 hover:border-teal/40 hover:text-teal-light">
                &larr; KF{prevLesson}
              </Link>
            ) : <div />}
            <Link href="/kf/meetings" className="text-sm font-medium text-teal-light hover:text-teal transition-colors">
              All Meetings
            </Link>
            {nextLesson !== null ? (
              <Link href={`/kf/meetings/kf${nextLesson}`} className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white/60 transition-all duration-300 hover:border-teal/40 hover:text-teal-light">
                KF{nextLesson} &rarr;
              </Link>
            ) : <div />}
          </div>

          <div className="mt-10 text-center text-xs text-white/25">
            karisfellowships.com &middot; &copy; Karis Fellowships International
          </div>
        </div>
      </section>
    </div>
  );
}
