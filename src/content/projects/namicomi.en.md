---
context: namicomi

sampleImages:
  - /img/sample/namicomi1.jpg
  - /img/sample/namicomi2.jpg
  - /img/sample/namicomi3.jpg
  - /img/sample/namicomi4.jpg
---

# The global ecosystem for comic fans and creators

With NamiComi, our vision is to be the global ecosystem for creators and fans of comics and manga. Creators can publish their titles in any language to a worldwide audience, fans can support creators, and fans can interact with each other and creators through an integrated social media and direct messaging system.

## Tech stack
TypeScript, Vue, Nuxt, Tailwind, FCM, Twilio, ECharts, Swiper.

## Challenges
- **Responsive design**. The website was made with close attention to its comfortable use on both desktop and mobile devices;
- **SEO best practices**. As a content-rich platform, NamiComi needs much more than a simple sitemap to work well with SEO. We utilized multiple, dynamically-generated sitemaps in order to actively inform search engines of newly-created pages as more creators publish their work on our platform;
- **Internationalization**. The website is accessible in many languages through a locale parameter (e.g. `/en`). Additionally, there are automatic redirects to the most appropriate locale parameter which adhere to the user's language preferences of their browser;
- **Comic reading**. Content consumption is the platform's main attraction. Given the platform's goal to deliver high quality images, handle every comic format, and allow the user to customize their reading experience as they desire, we went through plenty of challenges during the development of a fast and feature-rich reader. We managed to make a state-of-the-art reader that worked smoothly and satisfyingly in every device. Using [swiper](https://github.com/nolimits4web/swiper), mobile readers enjoy a near-native reading experience that's about as buttery-smooth as their device's refresh rate allows, while desktop readers benefit from keyboard hotkeys to navigate throughout the chapters. The reader is completely customizable, from reading mode to image width. Such settings are saved on the cloud on each user's account. Because we know people may read on different devices occasionally, we developed separate, customizable reader profiles that apply conditionally depending on the screen resolution. This way, users can have their own "mobile" preset, without affecting the "desktop" one. Users can also zoom in on images in case something's too small to read with just a double tap, or the scroll wheel for desktop ones (oh, and they can customize whether the scroll wheel turns pages, zooms in on the current image, or do nothing at all!). Embedded comments in the reader reduce the friction for user engagement to zero. There's so much more under the hood but this bullet point's already gotten too long;
- **OAuth**: The platform was build from the get-go with robust security practices. Since day 1, logging in on the platform was achieved with OAuth authorization;
- **RESTful API interaction**: Given the large volume of data and relationships of content with other content, the platform was designed around a RESTful API. To help maintainability and portability, we developed a fully-fledged and consumer-agnostic API wrapper;
- **Displaying WordPress articles**: The platform also has a section for various news related primarily to Asian comics and shows. That content is hosted on WordPress, and we interact with its API to fetch the HTML content, sanitize it, and display it on our app to ensure it stylistically matches the rest of the site;
- **Notifications**: The platform provides notifications for certain events, such as when a user receives a reply to their comment, if it is reacted to, or if a new chapter is uploaded on a series they follow. Using Firebase Cloud Messaging (FCM), the website provides real-time notifications of said events, alongside a backlog of notifications they missed;
- **Social media**: The platform's ambition as the global ecosystem of comic fans and creators engendered the creation of a completely integrated social media system. The implementation of an infinite (virtual) scroller was paramount as a core component to such a feature, and as a result, we discovered challenges and the solutions big social companies have been exercizing for their own services;
- **Payments**: As one of the methods of monetization within the platform, monthly subscriptions to creators were made possible thanks to Stripe, but we've also kept internal support for an arbitrary amount of payment processors;
- **Studio and Admin**: The platform welcomes readers and creators alike. Creators need a place to manage their content. We have built a dynamic studio dashboard where every creator can manage their comics, chapters, subscriptions, as well as view data about their content. We integrated [echarts](https://github.com/apache/echarts) to display and organize analytical data;
- **BONUS: Time picker**: To allow creators to schedule their content for publishing on a later date, we built a scheduling mechanism. For the time picker specifically, I used trigonometric functions (sine and cosine) to calculate the numbers' positions on a round clock. I use this example to boast to my friends that math *does* have real-world applications :);
- **Direct messaging**: The platform supports WhatsApp-style direct messaging between users, organizations, as well as group chats comprising of both. That service is powered by Twilio. As a first experience it was tricky to bridge an event-based interface with a reactive framework, but still nothing we didn't manage to solve.

<!-- TODO: Remove this comment when I leave :)
## What I believe I could have done better
- **Less tech debt, better composability**: Even though I had some experience with Vue with my personal projects, due to my lack of professional experience at the time of making the baby steps for the platform, there were numerous instances of tech debt that costed my team valuable time to fend off as refactoring them was occasionally a tiresome process.
- **Better code consistency**: Vue provides multiple ways to do one thing. As I gained more experience with it, my opinion of what is the "best way" to do something evolved many times. This led to a lack of consistency across various components of the codebase, reducing its overall quality.
- **More tests, earlier**: Due to the current immaturity of test tooling for Vue/Nuxt applications, developing tests was a bigger chore than I'd hoped it was. As a result, large test coverage was deprioritized in favor of more featues. Of course, as a small team with an ambitious goal and limited time, we didn't have enough resources to do everything, but I still believe that a warmer attitude on the significance of tests would have cultivated a more robust codebase. Whenever I could, I invested time into creating our own test tooling, or conjuring up ways to use existing ones with our app.
- **Better accessibility**: Many parts of the website lack the necessary aria roles, tab index indicators, and other attributes to help browsers and accessibility tools process the website to make it accessible for people with disabilities, or people who access the site in various extreme conditions. I became conscious of accessibility way later than I wanted my past self to.

I'm sure my manager would have more things to add here :) but I hope I provided significant value to a wondrous team.
-->
