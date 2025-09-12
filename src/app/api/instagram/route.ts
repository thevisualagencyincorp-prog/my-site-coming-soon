import { NextResponse } from "next/server";

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramApiResponse {
  data: InstagramPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export async function GET() {
  try {
    // Try Instagram Basic Display API first
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (
      accessToken &&
      userId &&
      accessToken !== "your_actual_access_token_here"
    ) {
      console.log("Using Instagram API with credentials");

      const response = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,permalink,caption,timestamp,like_count,comments_count&access_token=${accessToken}&limit=12`,
        {
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      );

      if (response.ok) {
        const data: InstagramApiResponse = await response.json();
        console.log(`Fetched ${data.data?.length || 0} real Instagram posts`);

        const posts = data.data.map((post) => ({
          id: post.id,
          image: post.media_url,
          caption: post.caption || "",
          likes: post.like_count || 0,
          comments: post.comments_count || 0,
          timestamp: formatTimestamp(post.timestamp),
          type: getMediaType(post.media_type),
          permalink: post.permalink,
        }));

        return NextResponse.json(posts);
      }
    }

    // Fallback to mock data if API not configured or fails
    console.log("Instagram API not configured or failed, using mock data");
    return NextResponse.json(getMockPosts());
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(getMockPosts());
  }
}

function getMediaType(mediaType: string): "image" | "video" | "carousel" {
  switch (mediaType) {
    case "VIDEO":
      return "video";
    case "CAROUSEL_ALBUM":
      return "carousel";
    default:
      return "image";
  }
}

function formatTimestamp(timestamp: string): string {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInMs = now.getTime() - postDate.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInHours < 1) {
    return "now";
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else if (diffInDays < 7) {
    return `${Math.floor(diffInDays)}d ago`;
  } else {
    return postDate.toLocaleDateString();
  }
}

function getMockPosts() {
  return [
    {
      id: "1",
      image: "/images/instagram-placeholder.svg",
      caption:
        "🚀 Just launched an incredible brand identity for a tech startup! From concept to execution, we transformed their vision into a cohesive visual story that captures their innovative spirit. The color palette reflects their forward-thinking approach, while the typography conveys trust and modernity.\n\nWhat do you think makes a brand identity truly memorable? Share below! �\n\n#BrandIdentity #GraphicDesign #CreativeAgency #StartupLife #VisualStorytelling",
      likes: 247,
      comments: 34,
      timestamp: "3h ago",
      type: "carousel" as const,
      permalink: "#",
    },
    {
      id: "2",
      image: "/images/instagram-placeholder.svg",
      caption:
        "🎨 EDUCATIONAL THREAD: The Psychology of Color in Web Design\n\nDid you know that 90% of snap judgments about products are based on color alone? Here's what different colors communicate:\n\n🔴 RED = Energy, passion, urgency\n🔵 BLUE = Trust, stability, professionalism\n🟢 GREEN = Growth, harmony, health\n🟡 YELLOW = Optimism, creativity, warmth\n🟣 PURPLE = Luxury, creativity, wisdom\n🟠 ORANGE = Confidence, friendliness, success\n\nWhat's your brand's color personality? 🎯\n\n#WebDesign #ColorPsychology #UXDesign #DigitalMarketing #CreativeTips",
      likes: 189,
      comments: 28,
      timestamp: "8h ago",
      type: "image" as const,
      permalink: "#",
    },
    {
      id: "3",
      image: "/images/instagram-placeholder.svg",
      caption:
        "✨ \"The best way to predict the future is to create it.\" - Peter Drucker\n\nIn a world that's constantly changing, remember that you have the power to shape your own destiny. Whether you're an entrepreneur, creative, or just someone chasing their dreams - your vision matters.\n\nTake that first step today. Your future self will thank you. 🌟\n\n#Motivation #Entrepreneurship #SelfCare #CreativeLife #Inspiration #Mindfulness",
      likes: 312,
      comments: 45,
      timestamp: "1d ago",
      type: "image" as const,
      permalink: "#",
    },
    {
      id: "4",
      image: "/images/instagram-placeholder.svg",
      caption:
        "🎬 BEHIND THE SCENES: Creating a viral social media campaign for our client! Watch how we transformed their product launch into an engaging story that drove 300% engagement increase.\n\nFrom strategy to execution, here's the full creative process:\n• Research & insights gathering\n• Content strategy development\n• Visual concept creation\n• Copywriting & messaging\n• Multi-platform distribution\n• Performance tracking & optimization\n\nThe results? 📈 50K+ impressions, 8K+ engagements, and a 25% conversion rate!\n\n#SocialMediaMarketing #ContentCreation #DigitalStrategy #CampaignSuccess #MarketingTips",
      likes: 156,
      comments: 22,
      timestamp: "2d ago",
      type: "video" as const,
      permalink: "#",
    },
    {
      id: "5",
      image: "/images/instagram-placeholder.svg",
      caption:
        "💡 QUICK TIP: The 5-Second Rule for Creative Blocks\n\nEver feel stuck in a creative rut? Try this:\n\n1️⃣ Set a 5-second timer\n2️⃣ Brain dump EVERY idea (no judgment)\n3️⃣ Pick the most interesting one\n4️⃣ Start creating immediately\n5️⃣ Refine as you go\n\nCreativity isn't about perfection - it's about momentum! Sometimes you just need to start to find your flow. 🎨✨\n\nWhat's your go-to technique for overcoming creative blocks? Share in the comments!\n\n#CreativeTips #DesignTips #Productivity #CreativeProcess #EntrepreneurTips",
      likes: 278,
      comments: 41,
      timestamp: "3d ago",
      type: "image" as const,
      permalink: "#",
    },
  ];
}
