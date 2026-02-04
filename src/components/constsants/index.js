const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Satisfied Clients" },
  { value: 108, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    responsibilities: [
      "Developed and maintained user-facing features for the Hostinger website.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "Optimized web applications for maximum speed and scalability.",
    ],
  },
  {
    review:
      "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Developer",
    date: "June 2020 - December 2023",
    responsibilities: [
      "Led the development of Docker's web applications, focusing on scalability.",
      "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
      "Contributed to open-source projects that were used with the Docker ecosystem.",
    ],
  },
  {
    review:
      "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "React Native Developer",
    date: "March 2019 - May 2020",
    responsibilities: [
      "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
      "Improved app performance and user experience through code optimization and testing.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

const mockBlogs = [
  {
    _id: "1",
    title: "Building Scalable Microservices with Node.js",
    slug: "scalable-microservices-nodejs",
    content:
      "In-depth guide on creating microservices architecture with Node.js...",
    excerpt:
      "Learn how to design and implement scalable microservices using Node.js and Docker",
    featuredImage:
      "https://embarkingonvoyage.com/wp-content/uploads/2024/07/web-29-1-1080x675.webp",
    status: "published",
    featured: true,
    tags: ["nodejs", "microservices", "architecture"],
    categories: ["backend", "devops"],
    views: 2543,
    likes: 187,
    comments: [],
    seo: {
      metaTitle: "Node.js Microservices Guide",
      metaDescription:
        "Complete tutorial on building scalable microservices with Node.js",
      keywords: ["nodejs", "microservices", "scalability"],
    },
    createdAt: "2023-10-15T09:30:00Z",
    updatedAt: "2023-10-16T14:20:00Z",
    publishedAt: "2023-10-15T10:00:00Z",
    userId: "user1",
  },
  {
    _id: "2",
    title: "React Performance Optimization Techniques",
    slug: "react-performance-optimization",
    content:
      "Advanced techniques to make your React applications blazing fast...",
    excerpt: "20 proven methods to optimize React application performance",
    featuredImage:
      "https://images.ctfassets.net/fswbkokbwqb5/6MbT8rwAs2AjnjdcMRs8Ec/21ae6830f97aadb9dcf80992711a7244/image1-2.jpg",
    status: "published",
    featured: false,
    tags: ["react", "performance", "frontend"],
    categories: ["frontend"],
    views: 1892,
    likes: 143,
    comments: [],
    seo: {
      metaTitle: "React Performance Guide",
      metaDescription:
        "Optimize your React apps with these performance techniques",
      keywords: ["react", "performance", "optimization"],
    },
    createdAt: "2023-09-28T11:15:00Z",
    publishedAt: "2023-09-28T11:15:00Z",
    userId: "user1",
  },
  {
    _id: "3",
    title: "Modern CSS Layouts with Grid and Flexbox",
    slug: "modern-css-layouts",
    content: "Mastering responsive layouts with CSS Grid and Flexbox...",
    excerpt:
      "Complete guide to creating responsive layouts using modern CSS techniques",
    featuredImage:
      "https://media.licdn.com/dms/image/v2/D4D12AQFwKeu87oCLxg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1697177975404?e=2147483647&v=beta&t=yYjTmOxJ5z5fPpiDohhGtj7eyswkKOeNKuRyEsT4g1U",
    status: "published",
    featured: false,
    tags: ["css", "frontend", "responsive"],
    categories: ["frontend", "design"],
    views: 1456,
    likes: 98,
    comments: [],
    seo: {
      metaTitle: "CSS Layouts Guide",
      metaDescription: "Create modern layouts with CSS Grid and Flexbox",
      keywords: ["css", "grid", "flexbox", "layout"],
    },
    createdAt: "2023-09-10T08:45:00Z",
    publishedAt: "2023-09-10T08:45:00Z",
    userId: "user1",
  },
  {
    _id: "4",
    title: "Building RESTful APIs with Express.js",
    slug: "restful-apis-express",
    content: "Comprehensive guide to building production-ready REST APIs...",
    excerpt:
      "Step-by-step tutorial for creating robust REST APIs using Express.js",
    featuredImage:
      "https://miro.medium.com/v2/resize:fit:1200/1*gyUa6Qx-xcOR1vHg1IoVkw.png",
    status: "published",
    featured: false,
    tags: ["nodejs", "express", "backend"],
    categories: ["backend"],
    views: 2105,
    likes: 156,
    comments: [],
    seo: {
      metaTitle: "Express.js API Guide",
      metaDescription: "Build RESTful APIs with Express.js",
      keywords: ["express", "api", "rest", "nodejs"],
    },
    createdAt: "2023-08-22T13:20:00Z",
    publishedAt: "2023-08-22T13:20:00Z",
    userId: "user1",
  },
  {
    _id: "5",
    title: "State Management in React Applications",
    slug: "react-state-management",
    content: "Comparing Redux, Context API, and modern alternatives...",
    excerpt:
      "Complete overview of state management solutions in React ecosystem",
    featuredImage:
      "https://www.bacancytechnology.com/blog/wp-content/uploads/2023/02/Approaches-to-State-Management-in-React.webp",
    status: "published",
    featured: false,
    tags: ["react", "redux", "frontend"],
    categories: ["frontend"],
    views: 1789,
    likes: 132,
    comments: [],
    seo: {
      metaTitle: "React State Management Guide",
      metaDescription: "Comparing state management solutions for React",
      keywords: ["react", "state", "management", "redux"],
    },
    createdAt: "2023-08-05T10:30:00Z",
    publishedAt: "2023-08-05T10:30:00Z",
    userId: "user1",
  },
  {
    _id: "6",
    title: "Authentication Best Practices for Web Apps",
    slug: "authentication-best-practices",
    content: "Secure authentication implementation strategies...",
    excerpt:
      "Learn modern authentication techniques and security best practices",
    featuredImage:
      "https://miro.medium.com/v2/resize:fit:1182/0*pfboAHv0xkgzRXvx",
    status: "published",
    featured: false,
    tags: ["security", "authentication", "jwt"],
    categories: ["backend", "security"],
    views: 2310,
    likes: 201,
    comments: [],
    seo: {
      metaTitle: "Authentication Guide",
      metaDescription: "Best practices for implementing secure authentication",
      keywords: ["authentication", "security", "jwt", "oauth"],
    },
    createdAt: "2023-07-18T14:10:00Z",
    publishedAt: "2023-07-18T14:10:00Z",
    userId: "user1",
  },
  {
    _id: "7",
    title: "Docker for JavaScript Developers",
    slug: "docker-javascript-developers",
    content: "Containerizing JavaScript applications with Docker...",
    excerpt:
      "Practical guide to using Docker in JavaScript development workflow",
    featuredImage:
      "https://blog.codewithdan.com/wp-content/uploads/2023/06/Docker-Logo.png",
    status: "published",
    featured: false,
    tags: ["docker", "devops", "containers"],
    categories: ["devops"],
    views: 1654,
    likes: 121,
    comments: [],
    seo: {
      metaTitle: "Docker for JS Developers",
      metaDescription: "Containerize your JavaScript apps with Docker",
      keywords: ["docker", "javascript", "containers"],
    },
    createdAt: "2023-07-01T09:20:00Z",
    publishedAt: "2023-07-01T09:20:00Z",
    userId: "user1",
  },
  {
    _id: "8",
    title: "TypeScript for React Developers",
    slug: "typescript-react-developers",
    content: "Adopting TypeScript in React projects...",
    excerpt: "Comprehensive guide to using TypeScript with React",
    featuredImage:
      "https://devsarticles.com/wp-content/uploads/2024/02/react-with-typescript.png",
    status: "published",
    featured: false,
    tags: ["typescript", "react", "frontend"],
    categories: ["frontend"],
    views: 1987,
    likes: 178,
    comments: [],
    seo: {
      metaTitle: "TypeScript with React",
      metaDescription: "Using TypeScript in React applications",
      keywords: ["typescript", "react", "frontend"],
    },
    createdAt: "2023-06-14T11:45:00Z",
    publishedAt: "2023-06-14T11:45:00Z",
    userId: "user1",
  },
  {
    _id: "9",
    title: "Serverless Architecture with AWS Lambda",
    slug: "serverless-aws-lambda",
    content: "Building scalable applications with serverless...",
    excerpt: "Implementing serverless architecture using AWS Lambda",
    featuredImage:
      "https://www.xenonstack.com/hubfs/xenonstack-aws-serverless-computing.png",
    status: "published",
    featured: false,
    tags: ["aws", "serverless", "cloud"],
    categories: ["backend", "devops"],
    views: 1876,
    likes: 154,
    comments: [],
    seo: {
      metaTitle: "Serverless with AWS Lambda",
      metaDescription: "Building serverless apps with AWS Lambda",
      keywords: ["aws", "lambda", "serverless"],
    },
    createdAt: "2023-05-27T15:30:00Z",
    publishedAt: "2023-05-27T15:30:00Z",
    userId: "user1",
  },
  {
    _id: "10",
    title: "CI/CD Pipeline for JavaScript Projects",
    slug: "ci-cd-javascript",
    content: "Setting up continuous integration and deployment...",
    excerpt: "Complete guide to implementing CI/CD for JavaScript projects",
    featuredImage:
      "https://miro.medium.com/v2/resize:fit:1200/1*wCpVKCYvnCWbvI1Wh124YA.png",
    status: "published",
    featured: false,
    tags: ["ci/cd", "devops", "automation"],
    categories: ["devops"],
    views: 1765,
    likes: 142,
    comments: [],
    seo: {
      metaTitle: "CI/CD for JavaScript",
      metaDescription: "Implementing CI/CD pipelines for JS projects",
      keywords: ["ci/cd", "javascript", "automation"],
    },
    createdAt: "2023-05-10T10:15:00Z",
    publishedAt: "2023-05-10T10:15:00Z",
    userId: "user1",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  mockBlogs,
};
