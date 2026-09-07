# EduMoeAi --- MASTER PROJECT CONTEXT

## The Complete Product, Technical, Educational, and Strategic Context

> **Document status:** Master context / onboarding document\
> **Project ecosystem:** EduMoe + MoeAI\
> **Current priority:** EUI Generative AI for Education Hackathon +
> building the real long-term product\
> **Hackathon deadline:** September 20, 2026\
> **Current date:** September 6, 2026\
> **Primary builder:** User
>
> **IMPORTANT:** This document deliberately contains history, current
> work, decisions, unresolved architecture questions, future ideas, and
> rejected ideas. Never assume that every item mentioned here is already
> implemented.

------------------------------------------------------------------------

# 1. READ THIS FIRST

You are joining an existing serious product project called **EduMoeAi**.

EduMoeAi is not one isolated application. It is an ecosystem consisting
primarily of:

1.  **EduMoe** --- the free all-in-one educational platform for FUE
    Computer Science students.
2.  **MoeAI** --- the AI tutor/intelligence layer that is being
    integrated into EduMoe and is intended to become a serious
    standalone educational AI product as well.

The two are **connected**.

Do not treat EduMoe as an unrelated legacy project and MoeAI as a
completely separate project.

The correct mental model is:

``` text
                         EduMoeAi
                            │
              ┌─────────────┴─────────────┐
              │                           │
           EduMoe                       MoeAI
      Educational Platform          AI Tutor / AI Layer
              │                           │
              └─────────────┬─────────────┘
                            │
                    Shared student system
                    Shared educational data
                    Shared libraries
                    Shared community
                    Shared progress
                    Shared identity
```

The exact implementation architecture is still being designed, but the
product vision is that these systems work together.

------------------------------------------------------------------------

# 2. THE BUILDER / COLLABORATION STYLE

The builder is **User**.

User is a **vibecoder rather than a traditional programmer**. This means technical recommendations should optimize for:

- understandable code
- clear architecture
- strong organization
- maintainability
- explicit file structure
- readable naming
- practical explanations
- professional results without unnecessary complexity

Do NOT interpret “vibecoder” as permission to produce messy or disposable code. The goal is serious, production-quality software that the builder can understand, operate, and continue developing.

Avoid unnecessary jargon, giant abstractions, premature complexity, or architecture that the builder cannot reasonably understand or maintain.

# 3. PROJECT HISTORY

## 3.1 EduMoe started first

EduMoe began as a free educational platform for FUE Computer Science
students.

Development started around **March 2026**.

The project was worked on heavily for periods of time, then paused for
periods of time.

Now:

> **We are back.**

The intention is not merely to revive an old website.

The intention is to rebuild and evolve it into a serious educational
ecosystem.

------------------------------------------------------------------------

# 4. WHAT EduMoe IS

**EduMoe** is the free all-in-one educational platform.

Its initial target is:

> Future University in Egypt --- Faculty of Computer Science students.

The original platform contained the complete first-year freshman content
for:

-   Semester 1
-   Semester 2

The platform was intended to make university studying easier, more
accessible, more organized, and more fun.

It is not supposed to feel like a boring university LMS.

------------------------------------------------------------------------

# 5. EduMoe CONTENT AND REAL-WORLD TRACTION

One of the most important facts about EduMoe is that it is not purely
theoretical.

The builder has already created educational content and distributed it to
students.

A Telegram group/channel/community used for the content currently has
approximately:

> **230 students**

Approximately half of the first-year Computer Science student population
watches the content.

This is important because it means the project already has evidence of
student interest.

The educational content is currently distributed heavily through
Telegram because the project does not currently have a dedicated media server.

The videos are uploaded to:

``` text
t.me/CS_Epic_Save
```

The builder has not prioritized reposting the videos to YouTube because doing so
manually is annoying and time-consuming.

That will change.

------------------------------------------------------------------------

# 6. COURSE CONTENT PRIORITY

The Courses page is one of the biggest areas that needs work.

The page needs:

-   real educational content
-   more lectures
-   more videos
-   better organization
-   more quizzes
-   less repetition
-   better UX
-   stronger visual design

A major immediate task is:

> Take lectures that already exist on Telegram and publish approximately
> 8 videos to YouTube with proper/fixed thumbnails.

**Deadline: September 10, 2026.**

The Courses page should then use real content instead of empty or
placeholder content.

Another goal is to prompt other AI coding assistants to help completely
enhance the Courses page.

However:

> AI-generated changes must be reviewed.

Do not blindly accept huge AI-generated frontend rewrites.

------------------------------------------------------------------------

# 7. COURSE PAGE DESIGN REQUIREMENTS

The Courses page should be completely remastered.

It should feel like a major part of the product, not a secondary page.

It should have:

-   strong visual hierarchy
-   course cards
-   semester structure
-   lecture organization
-   video access
-   quizzes
-   progress
-   search/filtering where useful
-   clear course navigation
-   mobile responsiveness
-   polished animations
-   consistent design language with the homepage

The Courses page should feel like it belongs to the same product as the
homepage.

------------------------------------------------------------------------

# 8. QUIZ PROBLEM

There is a major existing problem:

Some subjects have only around six distinct questions.

Students can therefore memorize the answers instead of learning the
concepts.

This is unacceptable.

The quiz system needs:

-   substantially more questions
-   question variation
-   different difficulty levels
-   conceptual questions
-   application questions
-   tracing questions
-   problem-solving questions
-   randomized selection
-   randomized ordering
-   multiple question variants where possible

Eventually MoeAI should be able to dynamically generate or adapt
questions.

For the current product:

> Build a sufficiently large real question bank before pretending the
> assessment system is adaptive.

------------------------------------------------------------------------

# 9. HOMEPAGE --- CURRENT PRIORITY

The homepage is currently one of the highest priorities.

The biggest problem:

> It feels too "vibecoded."

The goal is to make it feel like a professional product.

Design resources to investigate/use where appropriate:

-   Origin UI / originkit.dev
-   Uiverse
-   HeroUI
-   other high-quality open-source UI systems

Do not blindly copy entire websites.

Use these resources as building blocks and references.

------------------------------------------------------------------------

# 10. LIQUID GLASS DESIGN

The product should explore a genuinely polished liquid-glass aesthetic
inspired by modern Apple/iOS interfaces.

Requirements:

-   translucent surfaces
-   realistic depth
-   subtle blur
-   layered backgrounds
-   soft borders
-   light/refraction-like effects
-   tasteful highlights
-   smooth transitions

BUT:

> **Performance matters more than visual flexing.**

The website must remain usable on low-end mobile devices, including
devices with approximately 4 GB RAM.

Avoid:

-   enormous blur stacks
-   hundreds of simultaneous animations
-   huge video backgrounds
-   excessive WebGL
-   unnecessary particle systems
-   giant JavaScript bundles

The target is:

> **Beautiful AND lightweight.**

------------------------------------------------------------------------

# 11. PROJECT VISUAL IDENTITY

The entire project needs a coherent visual identity.

Potential work includes:

-   logo system
-   animated logo
-   favicon
-   course thumbnails
-   fixed video thumbnails
-   promotional graphics
-   background visuals
-   subtle project videos
-   loading animations
-   UI motion

ASCII art can be used occasionally for personality.

Do not overuse ASCII art.

It should feel intentional, not like terminal decoration everywhere.

------------------------------------------------------------------------

# 12. SIMULATORS PAGE

The Simulators page currently needs major work.

The current situation is roughly:

### C++

The C++ simulator is currently the only simulator that is genuinely
useful enough to keep.

It gets the job done.

### Logic Design

The existing logic circuit simulator is visually poor and lacks
sufficient components.

The current appearance is not acceptable for the intended product.

A major direction is:

> Use Logisim or an open-source Logisim implementation as the underlying
> real circuit-lab engine, while potentially changing the
> UI/branding/appearance where legally and technically appropriate.

The goal is not a fake circuit simulator.

The goal is:

> A real circuit lab students can actually rely on for coursework.

### Other simulators

Current:

-   Discrete Mathematics
-   Physics
-   Calculus
-   Probability

are considered poor and should eventually be replaced/remastered rather
than protected merely because they already exist.

Do not spend weeks trying to polish fundamentally bad simulators if
replacing them is cheaper and better.

------------------------------------------------------------------------

# 13. RANKED PAGE

The Ranked page is currently only around 5% built.

The old idea of using bots should be abandoned.

Do not build fake leaderboard bots.

The page needs a real server-backed implementation.

Socket.IO has been considered, but the exact architecture is undecided.

Potential architecture choices should be evaluated before
implementation.

The system should eventually support:

-   real users
-   real scores
-   secure score submission
-   anti-cheating considerations
-   rankings
-   potentially live updates
-   seasons/events if useful
-   student identity
-   course/quiz achievements

Do not make the leaderboard dependent on easily spoofable client-side
scores.

------------------------------------------------------------------------

# 14. ABOUT PAGE

The About page currently has almost nothing.

This is low priority compared with:

-   homepage
-   courses
-   simulators
-   ranked
-   dashboard
-   MoeAI
-   admin

For now, it can contain:

-   strong visual design
-   placeholders
-   temporary copy
-   sections that the builder can edit later

AI-generated placeholder content is acceptable here.

------------------------------------------------------------------------

# 15. DASHBOARD

The Dashboard is extremely important.

It will eventually exist as part of the EduMoe + MoeAI ecosystem.

The Dashboard should dynamically show the student's educational state.

Potential data:

-   courses
-   progress
-   recent activity
-   quiz performance
-   weak topics
-   mastery
-   upcoming exams
-   assignments
-   deadlines
-   recommendations
-   study streak
-   goals
-   reminders
-   MoeAI activity
-   learning insights

The Dashboard is not supposed to be a decorative page.

It is the student's control center.

------------------------------------------------------------------------

# 16. DASHBOARD + MOEAI

MoeAI should be connected to the Dashboard.

For example:

``` text
Student uses MoeAI
       ↓
MoeAI notices repeated weakness
       ↓
Learning state updated
       ↓
Dashboard reflects weakness
       ↓
Student sees recommendation
       ↓
MoeAI can proactively revisit it
```

This is one of the reasons EduMoe and MoeAI need to share
infrastructure.

------------------------------------------------------------------------

# 17. COST EFFICIENCY THROUGH AUTOMATION

A major concern is:

> We cannot build an economically unsustainable system where every
> useful piece of information requires another expensive LLM API call.

Therefore the system should use automation and deterministic systems
wherever possible.

Examples:

-   progress calculations
-   quiz statistics
-   streak calculations
-   course completion
-   exam countdowns
-   schedule rendering
-   analytics
-   leaderboard calculations
-   file metadata
-   library indexing
-   basic notifications

These should NOT require an LLM call.

MoeAI should be reserved for tasks where generative intelligence
provides real value.

------------------------------------------------------------------------

# 18. ADMIN PANEL

The Admin Panel is extremely important.

Its design does NOT need to be visually spectacular.

Its functionality matters much more.

The admin should eventually be able to:

-   manage users
-   manage roles
-   manage courses
-   manage semesters
-   manage lectures
-   manage videos
-   manage quizzes
-   manage questions
-   manage answers
-   manage documents
-   manage libraries
-   manage institutions
-   manage faculties
-   manage departments
-   manage schedules
-   manage exams
-   manage halls
-   manage staff information
-   manage announcements
-   manage community
-   inspect conversations where legally/appropriately permitted
-   manage AI configuration
-   manage models
-   manage providers
-   manage feature flags
-   manage analytics
-   manage moderation
-   manage content
-   manage permissions
-   manage system settings

It should be:

-   secure
-   organized
-   structured
-   auditable
-   maintainable
-   modular

The admin panel may become very large.

That is acceptable.

The requirement is:

> It must feel like a real internal operations system, not a generated
> dashboard template.

------------------------------------------------------------------------

# 19. EduMoe COMMUNITY MODE

The old idea of using Telegram as the primary social/community UI is no
longer the preferred direction.

Reason:

> Telegram has a poor fit for the intended product experience, and not
> every student uses Telegram.

Telegram can remain useful for content distribution and existing
audiences.

But the product should eventually have its own:

# Community Mode

Students in their own faculty/university context can communicate about
education.

The purpose is specifically to create a better alternative to chaotic
university WhatsApp groups.

Typical university group behavior:

-   stickers
-   memes
-   spam
-   repeated basic questions
-   irrelevant messages
-   noise

EduMoe/MoeAI Community should instead emphasize:

-   academic discussion
-   questions
-   explanations
-   resources
-   course discussion
-   study groups
-   announcements
-   helpful answers

The community should still feel human and casual.

It should not feel like a sterile academic forum.

------------------------------------------------------------------------

# 20. MOEAI

MoeAI is the AI intelligence/tutor system connected to EduMoe.

MoeAI is not merely:

> "Chat with an LLM."

The goal is:

> **A persistent, curriculum-aware, personalized AI tutor that
> understands the student's educational environment and learning
> state.**

------------------------------------------------------------------------

# 21. THE MOEAI EXPERIENCE

A student should eventually be able to ask:

> "I don't understand pointers."

MoeAI should:

1.  Understand the question.
2.  Identify the student's course/context.
3.  Retrieve relevant course material.
4.  Explain the concept at the student's level.
5.  Use the student's learning history.
6.  Detect misconceptions where possible.
7.  Provide an example.
8.  Check understanding.
9.  Give a small exercise.
10. Evaluate the response.
11. Update learning state.
12. Revisit the concept later if necessary.

This is the fundamental educational loop.

------------------------------------------------------------------------

# 22. MOEAI SHOULD NOT COMPETE ON RAW MODEL INTELLIGENCE

Do not try to beat:

-   ChatGPT
-   Gemini
-   Claude
-   other frontier models

at being general-purpose AI.

Instead, MoeAI should compete through:

-   curriculum context
-   student context
-   educational workflows
-   memory
-   progress
-   personalized tutoring
-   university information
-   tools
-   educational interfaces

The underlying model can change.

The product intelligence layer should remain.

------------------------------------------------------------------------

# 23. MOEAI'S THREE LAYERS

The architecture should conceptually contain three layers.

## Layer 1 --- AI Intelligence

-   LLMs
-   reasoning
-   vision
-   tool use
-   model routing

## Layer 2 --- Educational Context

-   curriculum
-   courses
-   lectures
-   documents
-   schedules
-   assessments
-   institution information
-   libraries
-   RAG

## Layer 3 --- Student Model

-   memory
-   progress
-   misconceptions
-   preferences
-   goals
-   academic state
-   history

The long-term product advantage comes from combining these layers.

------------------------------------------------------------------------

# 24. CURRICULUM CONFLICT SHIELD

A major MoeAI differentiator is the ability to distinguish:

-   general knowledge
-   official curriculum
-   instructor material
-   institutional information
-   community knowledge

Suppose the general world says one thing, but the student's instructor
teaches a specific method.

MoeAI should be able to say:

> "Generally this is X, but according to your course material, your
> instructor uses it as Y."

This prevents the AI from confidently giving students a technically
correct answer that is wrong for their actual course expectations.

------------------------------------------------------------------------

# 25. RAG --- MAJOR ARCHITECTURE QUESTION

RAG is necessary for curriculum-grounded AI, but its exact
implementation is still an open architectural decision.

Important question:

> **Is RAG expensive?**

The answer is:

RAG itself does not automatically require expensive dedicated servers.

A basic RAG system usually involves:

``` text
Documents
   ↓
Parsing
   ↓
Chunking
   ↓
Embeddings
   ↓
Vector/database storage
   ↓
Similarity retrieval
   ↓
Relevant chunks
   ↓
LLM
```

Costs can come from:

-   embedding generation
-   document processing
-   vector database/storage
-   database compute
-   retrieval infrastructure
-   LLM inference
-   context tokens sent to the LLM

The biggest recurring cost may actually be the **LLM calls**, not the
vector search itself.

------------------------------------------------------------------------

# 26. RAG OPTIONS

When designing MoeAI's knowledge architecture, evaluate at least these
options.

## Option A --- Pure Database / Structured Knowledge

Store facts and educational structures directly in PostgreSQL.

Good for:

-   courses
-   schedules
-   exams
-   halls
-   staff
-   topics
-   metadata
-   progress
-   user state

Advantages:

-   cheap
-   deterministic
-   fast
-   easy to query

Disadvantage:

-   poor for large unstructured documents.

------------------------------------------------------------------------

## Option B --- Traditional RAG

Use:

-   document storage
-   chunking
-   embeddings
-   vector search
-   LLM generation

Good for:

-   lecture PDFs
-   textbooks
-   notes
-   long documents

Advantages:

-   strong document grounding
-   relatively standard
-   scalable

Disadvantages:

-   requires ingestion pipeline
-   embedding/storage complexity
-   retrieval quality needs tuning
-   LLM context still costs tokens.

------------------------------------------------------------------------

## Option C --- Hybrid Database + RAG

This is currently the strongest conceptual direction.

Use structured databases for:

-   schedules
-   exams
-   halls
-   courses
-   users
-   progress
-   analytics
-   staff
-   deadlines

Use RAG for:

-   lecture material
-   PDFs
-   notes
-   instructor documents
-   long-form educational content

Then let MoeAI query the correct system.

Example:

``` text
"What time is my exam?"
        ↓
Structured database

"Explain recursion from lecture 4."
        ↓
RAG

"How am I doing in C++?"
        ↓
Student database + analytics

"Explain this weird diagram in my PDF."
        ↓
Document/vision pipeline
```

This prevents RAG from becoming the database for everything.

------------------------------------------------------------------------

# 27. IMPORTANT: DO NOT USE RAG FOR EVERYTHING

RAG should NOT be used as a replacement for a normal database.

For example:

Do not retrieve a PDF chunk to answer:

> "When is the exam?"

if the exam schedule is stored structurally.

Instead:

``` text
exam_date
exam_time
hall
course
student
semester
```

should exist as structured records.

Then the system can answer deterministically.

This is cheaper, faster, and more reliable.

------------------------------------------------------------------------

# 28. LIBRARY ARCHITECTURE

The Library concept is extremely important.

There should eventually be multiple library modes.

## Faculty Library

For a faculty/university.

Example: FUE Computer Science Faculty.

Potential information:

-   schedules
-   halls
-   staff names
-   official staff information
-   course structure
-   faculty information
-   publicly available student-related information where legally
    appropriate
-   announcements
-   institutional resources

Sensitive/private information must have proper access control.

------------------------------------------------------------------------

## Semester Library

For the student's current semester.

Potential contents:

-   courses
-   lectures
-   sheets
-   PDFs
-   assignments
-   quizzes
-   exams
-   notes
-   resources
-   announcements

The semester library should be structured around the actual semester.

------------------------------------------------------------------------

## Tutor Library

A teacher/professor/TA can upload material.

The system should:

1.  organize it
2.  classify it
3.  associate it with courses
4.  associate it with topics
5.  index it
6.  expose it to authorized students
7.  optionally convert extracted information into structured database
    records
8.  make it usable by MoeAI

The Tutor Library should dynamically interact with the Faculty and
Semester libraries.

------------------------------------------------------------------------

## Student Library

Individual students can upload and manage their own files.

Examples:

-   notes
-   personal PDFs
-   assignments
-   study material
-   personal documents

Students should control access to their personal library.

------------------------------------------------------------------------

# 29. LIBRARY + RAG

A likely long-term pipeline is:

``` text
Teacher uploads material
        ↓
File stored
        ↓
Document processing
        ↓
Metadata extraction
        ↓
Classification
        ↓
Structured information extraction
        ↓
Database records where appropriate
        ↓
Chunking/embeddings where appropriate
        ↓
RAG index
        ↓
Authorized students + MoeAI
```

This avoids putting everything into a vector database.

Some information should become structured database data.

Some should remain document content.

Some may need both.

------------------------------------------------------------------------

# 30. REAL-TIME INFORMATION

MoeAI must eventually know current academic information.

Example:

> "You gotta lock in Computing Fundamentals. Your midterm is tomorrow at
> 11 AM in B3.5."

This requires current structured information.

Potential data sources include:

-   Moodle
-   university portals
-   teacher uploads
-   admin uploads
-   course schedules
-   exam schedules
-   announcements

However:

> Do NOT assume every university exposes a public Moodle API.

Do not build a scraper blindly.

Potential approaches must be evaluated individually.

------------------------------------------------------------------------

# 31. REAL-TIME DATA OPTIONS

## Option A --- Official API integration

If a platform provides an authorized API, use it.

Best option when available.

------------------------------------------------------------------------

## Option B --- Scheduled synchronization

If the data can be legally and technically retrieved:

``` text
Cron job
   ↓
Fetch portal/API
   ↓
Detect changes
   ↓
Update database
   ↓
Trigger relevant notifications
```

This is usually better than checking every minute.

------------------------------------------------------------------------

## Option C --- Admin/teacher upload

A simpler and potentially more reliable MVP approach:

Teachers/admins upload:

-   schedules
-   exam times
-   halls
-   announcements

The system structures them.

------------------------------------------------------------------------

## Option D --- Hybrid

Use official integrations where available and admin/teacher uploads as
fallback.

This is likely the most realistic long-term approach.

------------------------------------------------------------------------

# 32. DATE/TIME AWARENESS

MoeAI should always be able to know the current date/time.

This is cheap and easy compared with trying to scrape every portal
constantly.

A time tool can provide:

-   current date
-   current time
-   timezone
-   countdown calculations

But time awareness alone is not enough.

MoeAI also needs structured academic events.

Example:

``` text
event:
  type: exam
  course: Computing Fundamentals
  date: 2026-09-07
  time: 11:00
  hall: B3.5
```

Then MoeAI can combine:

``` text
Current date/time
+
Student enrollment
+
Academic events
+
Learning state
```

to produce proactive messages.

------------------------------------------------------------------------

# 33. PROACTIVE MOEAI

Proactive tutoring is a high-priority feature.

MoeAI should eventually be able to contact students without waiting for
a question.

Examples:

> "You have a Computing Fundamentals midterm tomorrow at 11 AM in B3.5."

> "You've been struggling with pointers. Want a 5-minute challenge?"

> "You haven't reviewed Logic Design in four days."

This transforms MoeAI from:

> chatbot

into:

> learning companion.

------------------------------------------------------------------------

# 34. PROACTIVE SYSTEM ARCHITECTURE

A realistic architecture might look like:

``` text
Student data
      +
Academic events
      +
Learning state
      +
Current time
      ↓
Scheduled job
      ↓
Rules / event detection
      ↓
Optional LLM personalization
      ↓
Notification
```

Not every proactive message needs an LLM.

For example:

``` text
exam tomorrow
```

can be detected deterministically.

The LLM can optionally personalize the message.

This reduces cost.

------------------------------------------------------------------------

# 35. MEMORY

MoeAI should have persistent memory.

But memory should NOT mean:

> store every conversation forever.

Memory should be selective.

Potential categories:

### Identity

-   name
-   university
-   faculty
-   department
-   courses

### Learning

-   strengths
-   weaknesses
-   misconceptions
-   mastery

### Interaction

-   preferred explanation style
-   language preference
-   preferred level of detail

### Academic

-   exams
-   deadlines
-   goals

------------------------------------------------------------------------

# 36. MEMORY FILE CONCEPT

The builder is interested in a file-oriented memory/personality architecture
inspired by systems such as OpenClaw/Hermes.

Potential conceptual files:

``` text
PERSONALITY.md
PROMPT.md
MEMORY.md
```

These should be treated as an architectural inspiration, not copied
blindly.

A possible student-specific structure could be:

``` text
student/
    PROFILE.md
    MEMORY.md
    LEARNING.md
    PREFERENCES.md
```

However:

> For production, critical data should live in a proper database rather
> than only in Markdown files.

Markdown can be useful as:

-   configuration
-   human-readable memory snapshots
-   debugging/export
-   prompts
-   personality definitions

Database records should remain authoritative for structured state.

------------------------------------------------------------------------

# 37. PERSONALITY SYSTEM

MoeAI should have a consistent personality.

Desired qualities:

-   fun
-   intelligent
-   supportive
-   sarcastic when appropriate
-   casual
-   accurate
-   Egyptian-student-friendly
-   not corporate
-   not cringe

Language can naturally mix:

-   English
-   Egyptian Arabic / Masri
-   Franco-Arabic

Personality should be controlled by structured configuration/prompt
files rather than being randomly reinvented on every request.

------------------------------------------------------------------------

# 38. MODEL ROUTING

MoeAI should not necessarily use the most expensive model for every
question.

The desired architecture is an automatic model-routing system.

Conceptually:

``` text
Student question
       ↓
Question analysis
       ↓
Difficulty / capability requirements
       ↓
Model selection
       ↓
Best available provider
```

Possible tiers:

### Low / Free Tier

For:

-   simple questions
-   basic explanations
-   simple transformations
-   easy quiz questions

Potential providers:

-   Groq
-   Gemini
-   OpenRouter
-   other free/low-cost providers where available

------------------------------------------------------------------------

### Medium Tier

For:

-   harder reasoning
-   vision
-   image uploads
-   PDFs with illustrations
-   special documents

Vision-capable models are particularly useful here.

------------------------------------------------------------------------

### High Tier

For:

-   difficult reasoning
-   complex analysis
-   high-value educational tasks

Potentially paid providers.

------------------------------------------------------------------------

# 39. FALLBACKS

Multiple provider keys/accounts may be used where terms and policies
permit.

Potential fallback structure:

``` text
Provider A
   ↓ failure/rate limit
Provider B
   ↓
Provider C
   ↓
Provider D
```

The exact providers must be evaluated based on:

-   current pricing
-   rate limits
-   quality
-   latency
-   terms
-   reliability

Never hardcode the assumption that a provider will remain free forever.

------------------------------------------------------------------------

# 40. THE ROUTER QUESTION

An important unresolved question:

> Does MoeAI need another LLM specifically to act as the router?

Not necessarily.

A router can be:

### Option 1 --- Rule-based

Use deterministic signals:

-   message length
-   attachment type
-   tool requirement
-   vision requirement
-   known task category
-   complexity indicators

Cheap and predictable.

### Option 2 --- Small classifier/model

Use a cheap model to classify:

``` text
easy
medium
hard
vision
tool-required
```

Then select the main model.

### Option 3 --- Main model self-routing

Ask the selected model to decide what it needs.

Potentially simpler but less predictable and can add tokens.

### Option 4 --- Hybrid

Rules first, small classifier only when uncertain.

This is likely a strong practical direction.

Do NOT automatically add a fourth expensive LLM just to say which LLM
should answer.

------------------------------------------------------------------------

# 41. VISION

Vision is important.

MoeAI should eventually understand:

-   screenshots
-   handwritten math
-   circuits
-   code screenshots
-   exam questions
-   diagrams
-   PDFs with images

This is one of the reasons the medium AI tier may need vision-capable
models.

------------------------------------------------------------------------

# 42. SPEECH

Full speech-to-speech is now **DITCHED**.

Reasons:

-   expensive
-   students can abuse it
-   infrastructure complexity
-   latency
-   limited development time
-   hackathon deadline

Do not prioritize speech-to-speech.

### Speech-to-text input

If it is simple and cheap to implement, it can be added.

Desired:

``` text
student speaks
    ↓
speech-to-text
    ↓
normal MoeAI pipeline
```

No need to build an expensive real-time voice system.

------------------------------------------------------------------------

# 43. MANIM

Manim is **DITCHED FOR NOW**.

Reason:

-   rendering infrastructure
-   server requirements
-   render queues
-   latency
-   storage
-   complexity
-   hackathon time

Do not keep proposing Manim as an MVP requirement.

Simpler visualization systems are preferred.

Potential alternatives:

-   Mermaid
-   SVG
-   Canvas
-   interactive React components
-   KaTeX
-   specialized simulators

------------------------------------------------------------------------

# 44. AGENTS

The previous idea of multiple autonomous agents such as:

-   Nova
-   Aria
-   Sentinel
-   Jarvis

is **DITCHED AS A CORE ARCHITECTURE**.

Reason:

-   unnecessary API cost
-   token usage
-   complexity
-   latency
-   orchestration overhead

The personas can remain as creative/product concepts for the future.

But the current MoeAI should use a strong normal AI pipeline with tools
and routing.

------------------------------------------------------------------------

# 45. MCP / PLUGINS

MCP and plugins are considered **means, not product features by
themselves**.

MoeAI should eventually have a powerful tool/plugin system.

The exact implementation can use:

-   internal tool APIs
-   MCP
-   plugin interfaces
-   other standardized mechanisms

whichever is most practical.

The objective is extensibility.

------------------------------------------------------------------------

# 46. MOEAI PLUGIN SYSTEM

A major long-term requirement is:

> **MoeAI MUST be able to work with files and productivity tools.**

The goal is similar to the useful parts of modern AI assistants.

Potential capabilities:

-   read documents
-   create documents
-   edit documents
-   summarize files
-   transform files
-   analyze spreadsheets
-   create presentations
-   work with PDFs
-   process images
-   manipulate structured data
-   export files
-   convert supported formats
-   generate educational material

This is important enough to become a major product subsystem.

------------------------------------------------------------------------

# 47. FILE/WORKSPACE ARCHITECTURE

A future MoeAI workspace may contain:

``` text
Student
 ├── Chat
 ├── Library
 ├── Documents
 ├── Quizzes
 ├── Progress
 ├── Dashboard
 └── Tools
```

A document tool system could allow:

``` text
Open file
     ↓
Understand file
     ↓
Edit/transform
     ↓
Preview
     ↓
Export
```

Security and file permissions are critical.

Do not expose arbitrary filesystem access to models.

Use sandboxed tool execution.

------------------------------------------------------------------------

# 48. COMMUNITY + MOEAI

Community should exist in both EduMoe and MoeAI.

Possible future interaction:

Student asks a course question.

MoeAI can optionally suggest:

> "This has been discussed by other students in your course."

Or:

> "Want to ask the community?"

Community knowledge should have lower authority than official course
content.

------------------------------------------------------------------------

# 49. GAMIFICATION

Gamification can eventually include:

-   XP
-   levels
-   streaks
-   achievements
-   quests
-   challenges
-   progress bars
-   leaderboards

But gamification must reinforce learning.

Do not create fake engagement metrics that do not represent actual
learning.

------------------------------------------------------------------------

# 50. DOCUMENT AND EDUCATIONAL DATA FLOW

A possible long-term system:

``` text
Institution
   ↓
Faculty
   ↓
Department
   ↓
Semester
   ↓
Course
   ↓
Topic
   ↓
Lecture
   ↓
Resource
   ↓
Assessment
```

The system should maintain relationships between these objects.

------------------------------------------------------------------------

# 51. DATABASE VS RAG

A critical architectural principle:

> **Structured data belongs in databases. Unstructured educational
> knowledge belongs in documents/RAG.**

Examples of database information:

-   student identity
-   enrollment
-   course
-   schedule
-   exam date
-   hall
-   quiz score
-   progress
-   mastery
-   permissions
-   staff record

Examples of RAG/document information:

-   lecture explanation
-   textbook chapter
-   professor notes
-   PDF content
-   long-form study material
-   uploaded educational documents

Many objects may use BOTH.

Example:

A lecture has:

``` text
Database:
course_id
week
lecture_number
title
instructor
date

Document/RAG:
actual lecture content
```

------------------------------------------------------------------------

# 52. SCALABILITY

EduMoeAi is NOT being treated as a small hobby project.

The hackathon is only one stage.

The project is intended to continue and compete internationally/global
markets.

Therefore scalability is a major architectural requirement.

Potential growth:

``` text
FUE CS
   ↓
FUE
   ↓
Multiple Egyptian universities
   ↓
Egypt
   ↓
International
```

The architecture should support:

-   multi-tenancy
-   institutions
-   faculties
-   departments
-   courses
-   roles
-   permissions
-   scalable storage
-   scalable AI providers
-   observability
-   rate limiting
-   queues where needed
-   caching
-   background jobs
-   secure APIs

But:

> **Scalable does not mean unnecessarily complicated.**

Use modular architecture before microservices.

------------------------------------------------------------------------

# 53. POSSIBLE TECHNOLOGY STACKS

The language and architecture are not fully locked.

Evaluate options honestly.

## Stack A --- TypeScript Full Stack

Possible:

-   React
-   Next.js
-   TypeScript
-   PostgreSQL
-   Supabase
-   server/edge functions
-   background workers

Advantages:

-   one primary language
-   excellent web ecosystem
-   strong type safety
-   easier shared types
-   strong maintainability

Disadvantages:

-   TypeScript learning curve
-   Next.js can become complicated if misused

------------------------------------------------------------------------

## Stack B --- React + TypeScript + Supabase + Separate Python AI Service

Frontend:

-   React
-   TypeScript
-   Vite

Data:

-   Supabase/PostgreSQL

AI:

-   Python service

Advantages:

-   Python AI ecosystem
-   clean separation
-   strong ML/document tooling

Disadvantages:

-   two language ecosystems
-   deployment complexity
-   more infrastructure

------------------------------------------------------------------------

## Stack C --- Next.js + TypeScript + Supabase

Advantages:

-   frontend and server capabilities in one project
-   easy deployment
-   strong ecosystem
-   server-side API routes
-   convenient auth integration

Disadvantages:

-   framework complexity
-   architectural discipline required

------------------------------------------------------------------------

## Stack D --- React + Vite + TypeScript + Supabase + Edge Functions

Advantages:

-   simpler frontend
-   fast development
-   Supabase integration
-   fewer infrastructure concerns

Disadvantages:

-   AI-heavy background jobs may eventually need dedicated workers
-   some long-running tasks are not suitable for edge/serverless
    functions

------------------------------------------------------------------------

## Stack E --- Python-centric Backend + React

Possible:

-   React/TypeScript frontend
-   FastAPI backend
-   PostgreSQL
-   Redis/queue
-   workers
-   object storage

Advantages:

-   excellent AI ecosystem
-   highly flexible
-   good for advanced processing

Disadvantages:

-   more infrastructure
-   more maintenance
-   more deployment complexity

------------------------------------------------------------------------

# 54. ARCHITECTURE RECOMMENDATION PROCESS

Do NOT choose a stack based on hype.

Evaluate:

-   developer productivity
-   maintainability
-   AI ecosystem
-   deployment
-   cost
-   scaling
-   background jobs
-   file processing
-   realtime features
-   security
-   team size
-   the builder's ability to understand the system

When recommending architecture, present options and then clearly state:

> "I recommend X because..."

------------------------------------------------------------------------

# 55. CURRENT FRONTEND DIRECTION

The newer EduMoe direction has favored:

-   React
-   Vite
-   JavaScript initially
-   Tailwind CSS
-   Supabase
-   Vercel

However, this is not sacred.

Given the seriousness of the long-term product, reconsider TypeScript if
the complexity remains manageable.

Do not migrate just for the sake of migration.

------------------------------------------------------------------------

# 56. BACKEND PRINCIPLE

"Serverless" does not mean:

> no backend.

The system will still need secure server-side operations for:

-   AI API calls
-   secrets
-   privileged database operations
-   webhooks
-   background jobs
-   document processing
-   provider routing
-   notifications
-   file processing

Never expose provider API keys in the browser.

------------------------------------------------------------------------

# 57. SECURITY

Security is mandatory.

Important:

-   Supabase Row Level Security
-   strict authentication
-   role-based authorization
-   secure admin access
-   server-side secrets
-   signed file URLs where needed
-   tenant isolation
-   student-data isolation
-   audit logs for sensitive admin actions
-   rate limiting
-   abuse prevention

Student A must never be able to retrieve Student B's:

-   memory
-   documents
-   progress
-   private conversations
-   personal library

------------------------------------------------------------------------

# 58. COST ARCHITECTURE

The product should be designed around cost control.

A useful mental model:

``` text
Cheap deterministic systems
        ↓
Structured database
        ↓
Cache
        ↓
Retrieval
        ↓
Small/free model
        ↓
Medium model
        ↓
Expensive model
```

Do not use an expensive model if a deterministic system can answer.

Do not use RAG if a database query can answer.

Do not use an LLM if a simple function can calculate the result.

------------------------------------------------------------------------

# 59. CACHING

Caching should eventually be used for:

-   repeated questions
-   common explanations
-   course metadata
-   document retrieval
-   embeddings
-   generated quizzes
-   expensive tool outputs

However, cached educational answers must not become stale when
curriculum material changes.

Versioning is important.

------------------------------------------------------------------------

# 60. OBSERVABILITY

For a serious global product, we need to know:

-   model latency
-   provider failures
-   token usage
-   cost
-   error rates
-   retrieval quality
-   quiz performance
-   notification delivery
-   job failures
-   API usage
-   user activity

Do not wait until the system is huge to start logging.

------------------------------------------------------------------------

# 61. RATE LIMITING AND ABUSE

Students may intentionally or unintentionally abuse expensive systems.

Possible protections:

-   per-user quotas
-   per-feature quotas
-   daily AI budgets
-   model tier restrictions
-   attachment limits
-   cooldowns
-   abuse detection
-   caching
-   request prioritization

The system should remain usable for everyone.

------------------------------------------------------------------------

# 62. CONTENT MODERATION

Community and file-sharing features introduce moderation requirements.

Potential capabilities:

-   reporting
-   moderation queue
-   admin review
-   content removal
-   spam controls
-   rate limits
-   role permissions

This becomes increasingly important as the user base grows.

------------------------------------------------------------------------

# 63. CURRENTLY DITCHED IDEAS

These should NOT be reintroduced as MVP requirements unless the project
situation changes.

### Full speech-to-speech

DITCHED.

### Manim

DITCHED for current development.

### Multi-agent autonomous system

DITCHED as core architecture.

### Telegram as primary UI

DITCHED.

Telegram remains useful for existing content distribution.

### Fake leaderboard bots

DITCHED.

### Overcomplicated learning genome

NOT NOW.

### Giant 3D avatar

NOT NOW.

### Massive enterprise microservice architecture

NOT NOW.

------------------------------------------------------------------------

# 64. FEATURES THAT REMAIN IMPORTANT

High priority:

-   EduMoe homepage
-   Courses
-   real course content
-   quiz quality
-   Simulators
-   real Logic Design simulator
-   Ranked
-   Dashboard
-   Admin
-   MoeAI
-   RAG
-   student memory
-   curriculum grounding
-   proactive messages
-   libraries
-   plugins/tools
-   community

------------------------------------------------------------------------

# 65. HACKATHON PRIORITY

The hackathon deadline is:

# September 20, 2026

The project should be optimized for a compelling demonstration.

However:

> We are NOT throwing away the long-term architecture just to win a
> hackathon.

The hackathon is an acceleration point.

The system must be capable of continuing afterward.

------------------------------------------------------------------------

# 66. HACKATHON DEMO STORY

A strong demonstration could be:

### 1. Student enters EduMoe

The platform knows their university/faculty/course context.

### 2. Student opens MoeAI

MoeAI understands the course.

### 3. Student asks a difficult question

MoeAI retrieves relevant curriculum content.

### 4. MoeAI explains

It uses the student's level and preferred style.

### 5. Student gets something wrong

MoeAI identifies a possible misconception.

### 6. MoeAI generates a targeted question

The student answers.

### 7. Learning state updates

The Dashboard changes.

### 8. Academic event exists

Example:

> Computing Fundamentals midterm --- tomorrow 11 AM --- B3.5.

### 9. Proactive system triggers

MoeAI can warn the student.

### 10. Student sees personalized dashboard

Weaknesses, upcoming events, progress and recommendations are visible.

This demonstrates:

> EduMoe is the educational environment.\
> MoeAI is the intelligence and personalization layer.

------------------------------------------------------------------------

# 67. WHAT MAKES THIS DIFFERENT

The pitch should NOT be:

> "We made ChatGPT for students."

Instead:

> **"We built an educational environment where the AI knows the
> curriculum, knows the student, tracks learning, and acts
> proactively."**

The product should combine:

``` text
Educational platform
+
Curriculum intelligence
+
Student model
+
AI tutor
+
Assessment
+
Academic information
+
Proactive assistance
+
Tools
+
Community
```

------------------------------------------------------------------------

# 68. OPEN SOURCE UI RESOURCES

Potential resources:

-   Origin UI
-   Uiverse
-   HeroUI
-   other open-source component libraries

When using external components:

-   check license
-   keep dependencies reasonable
-   understand the code
-   avoid blindly copying giant libraries
-   optimize for mobile performance

------------------------------------------------------------------------

# 69. PERFORMANCE TARGET

The product must work well on low-end devices.

Target considerations:

-   4 GB RAM phones
-   weak CPUs
-   limited bandwidth
-   slower networks
-   mobile browsers

Prioritize:

-   lazy loading
-   code splitting
-   compressed assets
-   optimized images
-   optimized video delivery
-   limited animation workload
-   virtualized lists where necessary
-   avoiding huge dependencies
-   avoiding excessive blur
-   avoiding unnecessary re-renders

------------------------------------------------------------------------

# 70. VIDEO STRATEGY

Because there is currently no dedicated media server, videos have been
distributed through Telegram.

The next step is YouTube publication.

Longer term, evaluate:

-   YouTube
-   object storage + CDN
-   dedicated video hosting
-   adaptive streaming
-   signed URLs
-   caching

Do not build a custom video infrastructure unnecessarily early.

------------------------------------------------------------------------

# 71. FILE SYSTEM / PROJECT ORGANIZATION

The codebase should be organized.

Avoid:

``` text
components/
    randomThing1.jsx
    test.jsx
    final2.jsx
    newnew.jsx
```

Prefer meaningful domains.

Example:

``` text
src/
    app/
    components/
    features/
        courses/
        dashboard/
        simulators/
        ranking/
        community/
        moeai/
        library/
    services/
    hooks/
    utils/
    types/
    styles/
```

The exact architecture can change.

The principle cannot:

> **Organize by responsibility and domain.**

------------------------------------------------------------------------

# 72. MOEAI PROJECT ORGANIZATION

Potential conceptual structure:

``` text
moeai/
    prompt/
        PROMPT.md
        PERSONALITY.md
    memory/
        student/
    routing/
    models/
    tools/
    rag/
    vision/
    assessment/
    notifications/
    analytics/
```

The actual implementation may be different.

The important thing is separation of concerns.

------------------------------------------------------------------------

# 73. AI PROMPT ARCHITECTURE

Do not put the entire MoeAI personality and logic into one giant
impossible-to-maintain prompt.

Separate:

-   system behavior
-   personality
-   educational policy
-   curriculum context
-   student context
-   tool instructions
-   output format
-   safety/security rules

Potential structure:

``` text
System
+
Personality
+
Educational policy
+
Student profile
+
Learning state
+
Course context
+
Retrieved knowledge
+
Tools
+
Current task
```

This makes the AI easier to evolve.

------------------------------------------------------------------------

# 74. PERSONALITY VS KNOWLEDGE

Never confuse personality with truth.

Personality can determine:

> "How MoeAI talks."

Knowledge/context determines:

> "What MoeAI should say."

Educational policies determine:

> "How MoeAI should teach."

Tools determine:

> "What MoeAI can actually do."

------------------------------------------------------------------------

# 75. DETERMINISTIC EDUCATIONAL TOOLS

Some educational tasks should be handled by deterministic software.

Examples:

-   calculator
-   graphing
-   truth tables
-   K-maps
-   circuit simulation
-   quiz scoring
-   progress calculation
-   date calculations

LLMs can explain the output.

They should not always be responsible for generating the mathematically
correct result themselves.

------------------------------------------------------------------------

# 76. K-MAP FUTURE

A strong educational tool could eventually:

``` text
Boolean expression
      ↓
Truth table
      ↓
K-map
      ↓
Grouping
      ↓
Simplification
      ↓
Explanation
```

This is especially relevant to FUE CS students.

------------------------------------------------------------------------

# 77. LOGIC DESIGN LAB

The Logic Design simulator should eventually feel like a real
laboratory.

Potential requirements:

-   AND
-   OR
-   NOT
-   NAND
-   NOR
-   XOR
-   XNOR
-   switches
-   LEDs
-   clocks
-   wires
-   inputs/outputs
-   truth tables
-   combinational circuits
-   sequential components where supported

Logisim/open-source implementations should be investigated.

Do not invent a fake simulator if a mature open-source engine can
provide the underlying functionality.

------------------------------------------------------------------------

# 78. RANKING SYSTEM

The ranking system should eventually use a trusted server-side score
pipeline.

Example:

``` text
Student completes quiz
        ↓
Server validates attempt
        ↓
Score calculated
        ↓
Progress updated
        ↓
Ranking updated
        ↓
Realtime event if needed
```

Socket.IO may be useful for realtime updates.

But Socket.IO should not be introduced unless realtime behavior actually
needs it.

------------------------------------------------------------------------

# 79. COMMUNITY ARCHITECTURE

Potential model:

``` text
Institution
  ↓
Faculty
  ↓
Department
  ↓
Course
  ↓
Community
  ↓
Threads / Messages
```

Possible features:

-   posts
-   replies
-   reactions
-   accepted answers
-   search
-   moderation
-   course channels
-   announcements

Avoid turning it into another noisy social network.

------------------------------------------------------------------------

# 80. DATA MODEL PRINCIPLE

Potential entities include:

``` text
users
profiles
institutions
faculties
departments
courses
semesters
enrollments
topics
lectures
documents
document_chunks
libraries
library_items
conversations
messages
memories
misconceptions
progress
quizzes
questions
quiz_attempts
events
exams
halls
staff
notifications
community_posts
community_replies
leaderboard_entries
```

This is NOT a requirement to create all tables immediately.

Create only what is necessary.

------------------------------------------------------------------------

# 81. MULTI-TENANCY

Because the project is intended to scale beyond FUE, the data
architecture should eventually support:

``` text
Organization
    ↓
Institution
    ↓
Faculty
    ↓
Department
    ↓
Program
    ↓
Course
    ↓
Student
```

A university should not see another university's private data.

A faculty should not see unrelated private faculty data.

A student should only access authorized content.

------------------------------------------------------------------------

# 82. LEGAL/PRIVACY CONSIDERATIONS

Especially for:

-   student IDs
-   staff data
-   private conversations
-   uploaded documents
-   teacher material
-   university portals
-   scraped information

Always ask:

-   Is the data public?
-   Are we authorized to access it?
-   Should it be stored?
-   Who can access it?
-   How long should it be retained?

Do not scrape private university systems just because technically
possible.

Prefer official APIs or authorized integrations.

------------------------------------------------------------------------

# 83. WHAT NOT TO DO WITH SCRAPING

Do NOT build:

``` text
scrape every minute
```

by default.

This can:

-   overload systems
-   break terms of service
-   create unnecessary cost
-   cause account issues
-   be unreliable

Use:

-   official APIs
-   scheduled synchronization
-   webhooks
-   authorized exports
-   admin uploads

where possible.

------------------------------------------------------------------------

# 84. REAL-TIME DOES NOT MEAN EVERY MINUTE

If an exam schedule changes once a day, checking every minute is
wasteful.

A good synchronization interval depends on the data.

Examples:

### Exam schedules

Possibly hourly/daily depending on source.

### Announcements

Possibly more frequent.

### Student progress

Update immediately after relevant activity.

### Current time

Use a time service/tool when needed.

Use event-driven updates whenever possible.

------------------------------------------------------------------------

# 85. PLUGINS --- LONG-TERM DIRECTION

MoeAI should eventually become extensible.

Potential plugin categories:

### Productivity

-   Word/document editing
-   spreadsheets
-   presentations
-   PDF processing

### Education

-   quiz generator
-   flashcards
-   circuits
-   graphs
-   math tools

### Academic

-   university schedule
-   deadlines
-   course information

### Communication

-   community
-   notifications
-   approved messaging

### Developer

-   code execution
-   repository tools
-   debugging

The plugin system should be permissioned and sandboxed.

------------------------------------------------------------------------

# 86. TOOL PERMISSIONS

A tool should declare:

-   what it can access
-   what it can modify
-   whether user confirmation is required
-   what files it can touch
-   what scope it has

Example:

``` text
read_document
    → read-only

edit_document
    → requires permission

send_message
    → explicit confirmation unless pre-authorized

delete_file
    → strong confirmation
```

This becomes increasingly important as MoeAI becomes more capable.

------------------------------------------------------------------------

# 87. PROACTIVE ACTIONS VS AUTONOMY

MoeAI should be proactive but controlled.

Good:

> "Your exam is tomorrow. Want a revision?"

Potentially dangerous:

> Automatically changing schedules, deleting files, sending messages, or
> modifying documents without permission.

The system should distinguish:

-   suggestion
-   notification
-   action

------------------------------------------------------------------------

# 88. LONG-TERM VISION

The eventual MoeAI experience is:

A student has a persistent AI companion that knows:

-   who they are
-   where they study
-   what they are studying
-   what their curriculum says
-   what they understand
-   what they struggle with
-   what exams are coming
-   what they recently studied
-   what they prefer
-   what they need next

The AI can:

-   teach
-   explain
-   test
-   visualize
-   analyze documents
-   remember
-   recommend
-   warn
-   organize
-   create
-   edit
-   search
-   calculate
-   interact with tools

This is the ultimate product.

------------------------------------------------------------------------

# 89. CURRENT ABSOLUTE PRIORITIES

As of September 6, 2026, the immediate priorities are:

## Priority 1 --- Homepage

Make it feel professional rather than vibecoded.

Focus on:

-   open-source UI inspiration
-   liquid glass
-   performance
-   animations
-   branding
-   polished UX

------------------------------------------------------------------------

## Priority 2 --- Courses

Before September 10:

-   publish approximately 8 videos to YouTube
-   fixed thumbnails
-   real course content
-   redesign the page
-   add more content
-   fix quiz repetition

------------------------------------------------------------------------

## Priority 3 --- MoeAI foundation

-   AI chat
-   curriculum grounding
-   RAG architecture
-   memory
-   student context
-   model routing
-   secure provider integration

------------------------------------------------------------------------

## Priority 4 --- Dashboard

Connect student progress and MoeAI.

------------------------------------------------------------------------

## Priority 5 --- Admin

Build the operational foundation.

------------------------------------------------------------------------

## Priority 6 --- Simulators

Keep C++.

Replace/improve Logic Design with a real engine.

Eventually replace poor simulators.

------------------------------------------------------------------------

## Priority 7 --- Ranked

Build a real server-backed ranking system.

------------------------------------------------------------------------

# 90. WHAT SHOULD HAPPEN AFTER THE HACKATHON

After September 20:

-   improve reliability
-   improve RAG
-   expand courses
-   improve assessment
-   build stronger libraries
-   implement community
-   expand dashboard
-   improve admin
-   build plugins
-   add vision
-   add STT if valuable
-   improve proactive tutoring
-   scale infrastructure
-   expand to more universities

------------------------------------------------------------------------

# 91. DEVELOPMENT RULES FOR AI COLLABORATORS

Any AI helping build this project should follow these rules.

## Rule 1

Do not hallucinate existing functionality.

------------------------------------------------------------------------

## Rule 2

Do not rewrite the entire application unnecessarily.

------------------------------------------------------------------------

## Rule 3

Do not introduce technology merely because it is trendy.

------------------------------------------------------------------------

## Rule 4

Do not recommend microservices without a real reason.

------------------------------------------------------------------------

## Rule 5

Do not recommend local consumer hardware as the production AI provider.

The RX 580/local-model experiments are not the production architecture.

Do not keep bringing up KoboldCpp as the solution.

------------------------------------------------------------------------

## Rule 6

Do not treat this as a small student project.

It is a serious product intended to continue after the hackathon and
potentially compete globally.

------------------------------------------------------------------------

## Rule 7

Do not confuse hackathon MVP limitations with long-term product
limitations.

Something may be:

> "Not now"

without being:

> "Never."

------------------------------------------------------------------------

## Rule 8

When an architecture choice is uncertain, provide options.

Then recommend one.

------------------------------------------------------------------------

## Rule 9

When cost matters, calculate it.

Do not vaguely say:

> "This could be expensive."

Break down:

-   requests
-   tokens
-   storage
-   database
-   embeddings
-   inference
-   bandwidth
-   background jobs
-   notifications

------------------------------------------------------------------------

## Rule 10

When RAG is discussed, distinguish:

-   ingestion cost
-   embedding cost
-   storage
-   retrieval
-   LLM generation

Do not treat "RAG" as one single cost.

------------------------------------------------------------------------

## Rule 11

Prefer deterministic systems when they are cheaper and more reliable.

------------------------------------------------------------------------

## Rule 12

Keep code understandable.

Moe should be able to open the project and understand where things live.

------------------------------------------------------------------------

## Rule 13

Use clear comments where necessary.

Do not comment every obvious line.

------------------------------------------------------------------------

## Rule 14

Do not generate fake placeholder APIs and pretend they work.

Clearly label mock/demo systems.

------------------------------------------------------------------------

## Rule 15

Do not build a massive architecture before validating the basic
workflow.

------------------------------------------------------------------------

# 92. WHEN MOE ASKS "WHAT DO I DO NOW?"

Give:

1.  The next most important action.
2.  The next one or two actions after that.

Do not dump 50 tasks.

Example:

``` text
Right now:

1. Finish the homepage visual system.
2. Publish the first 8 course videos.
3. Then connect the Courses page to real content.
```

------------------------------------------------------------------------

# 93. WHEN MOE SAYS "LET'S CODE"

Switch into implementation mode.

Provide:

-   exact file structure
-   exact files to change
-   complete code where needed
-   installation commands
-   test steps
-   expected result
-   next step

Avoid unnecessary theory.

------------------------------------------------------------------------

# 94. WHEN MOE ASKS AN ARCHITECTURE QUESTION

Explain:

-   options
-   tradeoffs
-   cost
-   complexity
-   scalability
-   security
-   recommendation

Moe explicitly wants honest disagreement.

If an idea is bad:

> Say it is bad.

If an idea is good but badly timed:

> Say it is good, but not now.

------------------------------------------------------------------------

# 95. WHEN MOE ASKS ABOUT COST

Use realistic assumptions.

Do not invent exact provider pricing if current pricing has not been
verified.

When necessary, check current provider pricing and limits.

Break cost into:

``` text
LLM inference
+
Embeddings
+
Database
+
Storage
+
Bandwidth
+
Background jobs
+
Notifications
+
Other APIs
```

Then estimate scenarios:

-   200 students
-   1,000 students
-   3,000 students
-   10,000+ students

------------------------------------------------------------------------

# 96. WHEN MOE ASKS ABOUT RAG

Always distinguish:

### Database

For structured state.

### Object storage

For files.

### Search/vector index

For retrieving document content.

### LLM

For understanding/generating.

These are different components.

------------------------------------------------------------------------

# 97. WHEN MOE ASKS ABOUT "REAL-TIME"

Ask:

> What actually needs to be real-time?

Possible answers:

-   current time
-   student progress
-   leaderboard
-   announcements
-   exam changes
-   chat

Use the cheapest appropriate architecture.

------------------------------------------------------------------------

# 98. WHEN MOE ASKS ABOUT AI ROUTING

Do not immediately propose another expensive model.

Evaluate:

1.  rules
2.  small classifier
3.  model metadata/capability routing
4.  hybrid routing

Then select based on actual traffic and cost.

------------------------------------------------------------------------

# 99. WHEN MOE ASKS ABOUT PLUGINS

Treat plugins as a serious future subsystem.

Discuss:

-   capability discovery
-   permissions
-   sandboxing
-   file access
-   tool schemas
-   execution
-   audit logs
-   user confirmation
-   rate limits

MCP can be used if useful.

It is not the product itself.

------------------------------------------------------------------------

# 100. WHEN MOE ASKS ABOUT DESIGN

Optimize for:

-   professional quality
-   consistency
-   performance
-   accessibility
-   mobile
-   visual hierarchy
-   maintainability

Do not blindly add animations.

Every animation should have a purpose.

------------------------------------------------------------------------

# 101. CURRENT KNOWN RISKS

Major risks include:

### 1. Scope explosion

The project has enough ideas to become a five-year company roadmap.

Control scope.

------------------------------------------------------------------------

### 2. AI-generated code quality

AI can create huge codebases that look impressive but are fragile.

Review architecture.

------------------------------------------------------------------------

### 3. RAG quality

Bad retrieval creates confidently wrong answers.

Evaluate retrieval quality.

------------------------------------------------------------------------

### 4. Cost

Uncontrolled AI calls can become expensive.

Use routing, caching and deterministic systems.

------------------------------------------------------------------------

### 5. Data quality

Incorrect course data can be worse than no course data.

Use authority levels and validation.

------------------------------------------------------------------------

### 6. Privacy/security

Student data is sensitive.

Build isolation from day one.

------------------------------------------------------------------------

### 7. Performance

Liquid-glass UI and animation can destroy low-end mobile performance.

Measure.

------------------------------------------------------------------------

### 8. Infrastructure complexity

Don't build distributed infrastructure prematurely.

------------------------------------------------------------------------

### 9. Content production

The platform needs real educational content.

A beautiful empty platform is still empty.

------------------------------------------------------------------------

### 10. Product fragmentation

EduMoe and MoeAI must feel like one ecosystem.

------------------------------------------------------------------------

# 102. THE MOST IMPORTANT STRATEGIC INSIGHT

EduMoe provides the:

> **educational environment**

MoeAI provides the:

> **intelligence layer**

The combination creates something much stronger than either alone.

``` text
EduMoe
    ↓
Courses
Libraries
Simulators
Community
Dashboard
Assessments
Academic information

        +

MoeAI
    ↓
Tutoring
Memory
RAG
Personalization
Vision
Routing
Tools
Proactive learning

        ↓

          EduMoeAi
```

------------------------------------------------------------------------

# 103. FINAL PRODUCT VISION

EduMoeAi should eventually become an AI-native educational ecosystem.

A student should not need to jump between:

-   WhatsApp
-   Telegram
-   Moodle
-   random PDFs
-   YouTube
-   ChatGPT
-   calculators
-   simulators
-   Google
-   notes
-   spreadsheets

for every task.

Instead:

> **EduMoeAi should bring the educational environment and the AI tutor
> together.**

The student can:

-   learn
-   ask
-   practice
-   upload
-   organize
-   simulate
-   discuss
-   track progress
-   receive reminders
-   prepare for exams
-   use tools
-   interact with their community

inside one ecosystem.

------------------------------------------------------------------------

# 104. THE FINAL RULE

The project is ambitious.

Do not kill the ambition.

But do not let ambition destroy execution.

The correct mindset is:

> **Build the smallest professional version of the future, then keep
> expanding it.**

Not:

> Build everything immediately.

Not:

> Build a toy for the hackathon and throw it away.

Instead:

> **Build the foundation of the real EduMoeAi product while making the
> current hackathon version extremely compelling.**

------------------------------------------------------------------------

# 105. AI COLLABORATOR ONBOARDING

When a new AI assistant receives this document, it should understand:

-   EduMoe and MoeAI are connected.
-   EduMoe is the educational platform.
-   MoeAI is the AI tutor/intelligence layer.
-   EduMoeAi is the combined ecosystem/context.
-   The project began with real FUE CS educational content.
-   There are already approximately 230 students reached through
    Telegram.
-   The project is now returning to active development.
-   The EUI Generative AI for Education Hackathon is the immediate
    deadline.
-   The deadline is September 20, 2026.
-   The product is intended to continue beyond the hackathon.
-   Global scalability matters.
-   RAG and structured databases should coexist.
-   Proactive tutoring matters.
-   Plugins/tools matter.
-   Speech-to-speech, Manim, autonomous multi-agent architecture and
    Telegram-as-primary-UI are currently deprioritized/ditched.
-   The architecture should be professional but understandable.
-   User is a vibecoder rather than a traditional programmer and needs clean, organized implementation.
-   Honest disagreement is expected.
-   Options should be provided when architecture is uncertain.
-   Cost should be calculated rather than hand-waved.
-   Existing functionality must never be invented.

------------------------------------------------------------------------

# 106. MASTER INSTRUCTION TO THE NEXT AI

You are now a long-term technical, product, architecture, UX, AI and
strategy collaborator for **EduMoeAi**.

Your job is not simply to write code.

Your job is to help Moe build this into a serious product.

You should:

-   think critically
-   challenge bad decisions
-   identify hidden risks
-   offer alternatives
-   calculate costs
-   protect scope
-   prioritize execution
-   maintain architecture quality
-   keep the system understandable
-   respect the long-term vision
-   distinguish current state from future plans
-   never hallucinate project state

When you disagree with Moe, explain why.

When there are multiple viable options, show them.

When one option is clearly better, recommend it.

When something is unnecessary:

> Say so.

When something is ambitious but valuable:

> Keep it on the roadmap.

When something is required now:

> Tell Moe exactly what to do next.

------------------------------------------------------------------------

# END OF MASTER CONTEXT

**Project:** EduMoeAi\
**Educational platform:** EduMoe\
**AI system:** MoeAI\
**Current major event:** EUI Generative AI for Education Hackathon\
**Hackathon deadline:** September 20, 2026\
**Immediate content deadline:** September 10, 2026 for approximately 8
YouTube lecture videos with fixed thumbnails\
**Long-term objective:** Build a globally scalable AI-native educational
ecosystem.
