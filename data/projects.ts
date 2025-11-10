export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
  demo?: string
  repo?: string
}

export const projects: Project[] = [
  {
    slug: "foreverydiamonds",
    title: "Forevery Diamonds",
    summary: "Forevery Diamonds is a website for the Forevery Diamonds community to buy and sell diamonds and jewelry.",
    tags: ["React", "GraphQL", "Node.js", "MongoDB", "Express"],
    demo: "https://foreverydiamonds.com",    
  },
  {
    slug: "Shopify Projects",
    title: "Shopify Websites",
    summary: "Created over 7+ shopify websites for clients.",
    tags: ["Shopify", "Liquid", "jQuery", "HTML", "CSS"],    
  },
  {
    slug: "growkarma",
    title: "Growkarma",
    summary: "GrowKarma is a website for the content creators to grow their audience and income.",
    tags: ["React", "GraphQL", "Node.js", "MongoDB", "Express", "MeteorJS", "Generative AI", "LLMs"],
    demo: "https://www.growkarma.com/",    
  },
  {
    slug: "cvdmart",
    title: "CVDMart - CVD Marketplace",
    summary: "CVDMart is a website for the CVD community to buy and sell CVDs.",
    tags: ["React", "GraphQL", "Node.js", "MongoDB", "Express"],
    demo: "https://cvdmart.com",   
  },
]
