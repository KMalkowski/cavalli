import { internalMutation } from "./_generated/server";

export const seedHorses = internalMutation({
  args: {},
  handler: async (ctx) => {
    const horseData = [
      {
        name: "Thunder Bay",
        breed: "Thoroughbred",
        age: 8,
        height: 16.2,
        price: 45000,
        description:
          "Exceptional racing bloodline with proven track record. Well-trained, responsive, and perfect for competitive riding. Has won multiple regional championships.",
        location: "Lexington, KY",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Midnight Star",
        breed: "Arabian",
        age: 6,
        height: 15.1,
        price: 32000,
        description:
          "Beautiful black Arabian mare with excellent conformation. Gentle temperament, great for trail riding and dressage. Up to date on all vaccinations.",
        location: "Scottsdale, AZ",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Golden Spirit",
        breed: "Quarter Horse",
        age: 10,
        height: 15.3,
        price: 18000,
        description:
          "Reliable and steady quarter horse, perfect for beginners. Excellent ground manners and very patient. Great for ranch work and pleasure riding.",
        location: "Austin, TX",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Storm Chaser",
        breed: "Paint Horse",
        age: 7,
        height: 15.2,
        price: 25000,
        description:
          "Stunning paint horse with unique markings. Well-trained in western disciplines. Great personality and loves attention from people.",
        location: "Denver, CO",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Royal Princess",
        breed: "Friesian",
        age: 5,
        height: 16.0,
        price: 55000,
        description:
          "Magnificent Friesian mare with flowing mane and tail. Excellent for dressage and driving. Imported bloodlines with exceptional movement.",
        location: "Wellington, FL",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Copper Canyon",
        breed: "Mustang",
        age: 9,
        height: 14.3,
        price: 12000,
        description:
          "Hardy mustang with incredible endurance. Perfect for trail riding and camping trips. Very sure-footed and intelligent.",
        location: "Reno, NV",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Duchess Belle",
        breed: "Tennessee Walker",
        age: 11,
        height: 15.2,
        price: 22000,
        description:
          "Smooth-gaited Tennessee Walker with excellent temperament. Perfect for pleasure riding and trail adventures. Very comfortable ride.",
        location: "Nashville, TN",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Fire Storm",
        breed: "Andalusian",
        age: 6,
        height: 15.3,
        price: 48000,
        description:
          "Elegant Andalusian stallion with exceptional presence. Trained in classical dressage. Beautiful movement and proud carriage.",
        location: "Los Angeles, CA",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Moonbeam",
        breed: "Appaloosa",
        age: 8,
        height: 15.1,
        price: 19000,
        description:
          "Spotted Appaloosa with gentle nature. Great for family riding and 4-H projects. Well-socialized and easy to handle.",
        location: "Boise, ID",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Thunder Cloud",
        breed: "Clydesdale",
        age: 12,
        height: 17.1,
        price: 35000,
        description:
          "Majestic Clydesdale gelding with feathered feet. Excellent for driving and parades. Gentle giant with amazing presence.",
        location: "Louisville, KY",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Silver Arrow",
        breed: "Thoroughbred",
        age: 4,
        height: 16.1,
        price: 38000,
        description:
          "Young thoroughbred with racing potential. Currently in training, showing great promise. Athletic and spirited.",
        location: "Saratoga Springs, NY",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Desert Rose",
        breed: "Arabian",
        age: 7,
        height: 14.3,
        price: 28000,
        description:
          "Refined Arabian mare with excellent bloodlines. Perfect for endurance riding. Hardy and athletic with great stamina.",
        location: "Phoenix, AZ",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Lucky Charm",
        breed: "Quarter Horse",
        age: 13,
        height: 15.0,
        price: 15000,
        description:
          "Experienced quarter horse perfect for beginners. Very patient and forgiving. Great for learning to ride and building confidence.",
        location: "Oklahoma City, OK",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Painted Sky",
        breed: "Paint Horse",
        age: 5,
        height: 15.2,
        price: 27000,
        description:
          "Beautiful paint horse with striking markings. Well-trained in both English and Western disciplines. Great all-around horse.",
        location: "Fort Worth, TX",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Black Beauty",
        breed: "Friesian",
        age: 8,
        height: 16.2,
        price: 62000,
        description:
          "Stunning black Friesian with exceptional movement. Trained to Grand Prix level dressage. Show quality horse with proven record.",
        location: "Aiken, SC",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Wild Spirit",
        breed: "Mustang",
        age: 6,
        height: 14.2,
        price: 10000,
        description:
          "Gentle mustang with natural athleticism. Great for trail riding and natural horsemanship. Very intelligent and willing to learn.",
        location: "Cheyenne, WY",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Smooth Operator",
        breed: "Tennessee Walker",
        age: 9,
        height: 15.3,
        price: 24000,
        description:
          "Champion Tennessee Walker with smooth gaits. Perfect for pleasure riding and trail competitions. Very comfortable and reliable.",
        location: "Murfreesboro, TN",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Spanish Dream",
        breed: "Andalusian",
        age: 7,
        height: 15.2,
        price: 45000,
        description:
          "Elegant Andalusian mare with classical training. Beautiful mover with excellent conformation. Perfect for dressage competition.",
        location: "San Diego, CA",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Spotted Thunder",
        breed: "Appaloosa",
        age: 10,
        height: 15.0,
        price: 17000,
        description:
          "Reliable Appaloosa gelding with unique spotted coat. Great for ranch work and trail riding. Very steady and dependable.",
        location: "Billings, MT",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Highland Chief",
        breed: "Clydesdale",
        age: 10,
        height: 17.0,
        price: 32000,
        description:
          "Impressive Clydesdale stallion with excellent bloodlines. Great for breeding and driving. Gentle temperament despite his size.",
        location: "Glasgow, KY",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Racing Wind",
        breed: "Thoroughbred",
        age: 5,
        height: 16.0,
        price: 42000,
        description:
          "Athletic thoroughbred with racing background. Now retired and perfect for sport horse disciplines. Great jumping ability.",
        location: "Ocala, FL",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Sahara Wind",
        breed: "Arabian",
        age: 9,
        height: 14.2,
        price: 26000,
        description:
          "Purebred Arabian with excellent endurance capabilities. Perfect for competitive trail riding. Hardy and athletic.",
        location: "Tucson, AZ",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Country Star",
        breed: "Quarter Horse",
        age: 14,
        height: 15.1,
        price: 13000,
        description:
          "Seasoned quarter horse with lots of experience. Perfect for beginner riders. Very patient and well-trained in basic disciplines.",
        location: "Amarillo, TX",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Rainbow Dancer",
        breed: "Paint Horse",
        age: 6,
        height: 15.3,
        price: 29000,
        description:
          "Colorful paint horse with excellent training. Great for western pleasure and trail riding. Very responsive and willing.",
        location: "Colorado Springs, CO",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Midnight Magic",
        breed: "Friesian",
        age: 6,
        height: 15.3,
        price: 58000,
        description:
          "Elegant Friesian gelding with excellent movement. Trained in dressage and driving. Beautiful horse with great presence.",
        location: "Middleburg, VA",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Canyon Runner",
        breed: "Mustang",
        age: 8,
        height: 14.1,
        price: 11000,
        description:
          "Sure-footed mustang perfect for mountain trail riding. Very hardy and intelligent. Great for experienced riders seeking adventure.",
        location: "Flagstaff, AZ",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Southern Belle",
        breed: "Tennessee Walker",
        age: 12,
        height: 15.1,
        price: 20000,
        description:
          "Classic Tennessee Walker mare with smooth gaits. Perfect for pleasure riding and showing. Very gentle and easy to handle.",
        location: "Chattanooga, TN",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Royal Dancer",
        breed: "Andalusian",
        age: 8,
        height: 15.1,
        price: 50000,
        description:
          "Magnificent Andalusian stallion with classical training. Excellent for haute école and dressage. Impressive movement and presence.",
        location: "Santa Barbara, CA",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Chief's Pride",
        breed: "Appaloosa",
        age: 7,
        height: 15.2,
        price: 21000,
        description:
          "Handsome Appaloosa gelding with excellent conformation. Great for western disciplines and trail riding. Very athletic and willing.",
        location: "Spokane, WA",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Scottish Warrior",
        breed: "Clydesdale",
        age: 9,
        height: 17.2,
        price: 38000,
        description:
          "Powerful Clydesdale gelding with excellent temperament. Great for driving and parades. Impressive size with gentle nature.",
        location: "Lexington, KY",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Lightning Bolt",
        breed: "Thoroughbred",
        age: 6,
        height: 16.3,
        price: 40000,
        description:
          "Fast thoroughbred with excellent jumping ability. Perfect for eventing and show jumping. Athletic and brave over fences.",
        location: "Wellington, FL",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Desert Jewel",
        breed: "Arabian",
        age: 5,
        height: 14.3,
        price: 30000,
        description:
          "Beautiful Arabian mare with excellent bloodlines. Perfect for breeding and riding. Great conformation and movement.",
        location: "Albuquerque, NM",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Rusty Spurs",
        breed: "Quarter Horse",
        age: 11,
        height: 15.2,
        price: 16000,
        description:
          "Experienced quarter horse gelding perfect for ranch work. Very reliable and steady. Great for cattle work and trail riding.",
        location: "Lubbock, TX",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Sunset Glory",
        breed: "Paint Horse",
        age: 4,
        height: 15.1,
        price: 31000,
        description:
          "Young paint horse with beautiful markings. Well-started under saddle with great potential. Very athletic and intelligent.",
        location: "Santa Fe, NM",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Ebony Knight",
        breed: "Friesian",
        age: 7,
        height: 16.1,
        price: 60000,
        description:
          "Stunning black Friesian stallion with exceptional movement. Trained in classical dressage. Show quality with proven bloodlines.",
        location: "Lexington, KY",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Free Spirit",
        breed: "Mustang",
        age: 7,
        height: 14.0,
        price: 9000,
        description:
          "Gentle mustang mare with natural ability. Great for natural horsemanship and trail riding. Very intelligent and willing to please.",
        location: "Carson City, NV",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Midnight Walker",
        breed: "Tennessee Walker",
        age: 10,
        height: 15.2,
        price: 23000,
        description:
          "Smooth-gaited Tennessee Walker with excellent temperament. Perfect for pleasure riding and trail adventures. Very comfortable ride.",
        location: "Knoxville, TN",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Flamenco Fire",
        breed: "Andalusian",
        age: 5,
        height: 15.0,
        price: 46000,
        description:
          "Young Andalusian stallion with incredible presence. Trained in classical dressage with beautiful movement. Great potential for competition.",
        location: "Paso Robles, CA",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Painted Warrior",
        breed: "Appaloosa",
        age: 9,
        height: 15.1,
        price: 18000,
        description:
          "Reliable Appaloosa gelding with striking coat pattern. Great for western disciplines and trail riding. Very steady and dependable.",
        location: "Great Falls, MT",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Highland Storm",
        breed: "Clydesdale",
        age: 11,
        height: 17.1,
        price: 34000,
        description:
          "Majestic Clydesdale mare with excellent bloodlines. Great for driving and breeding. Gentle temperament with impressive presence.",
        location: "Bardstown, KY",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Storm Runner",
        breed: "Thoroughbred",
        age: 7,
        height: 16.1,
        price: 37000,
        description:
          "Athletic thoroughbred gelding with excellent jumping ability. Perfect for hunters and jumpers. Brave and scopey over fences.",
        location: "Aiken, SC",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Arabian Nights",
        breed: "Arabian",
        age: 8,
        height: 14.2,
        price: 27000,
        description:
          "Elegant Arabian stallion with excellent conformation. Perfect for breeding and showing. Beautiful movement and proud carriage.",
        location: "Scottsdale, AZ",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Cowboy's Dream",
        breed: "Quarter Horse",
        age: 12,
        height: 15.0,
        price: 14000,
        description:
          "Experienced quarter horse gelding perfect for ranch work. Very reliable and steady. Great for cattle work and pleasure riding.",
        location: "Abilene, TX",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Mystic Paint",
        breed: "Paint Horse",
        age: 8,
        height: 15.2,
        price: 26000,
        description:
          "Beautiful paint horse mare with unique markings. Well-trained in western disciplines. Great personality and loves people.",
        location: "Durango, CO",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Shadow Dancer",
        breed: "Friesian",
        age: 9,
        height: 16.0,
        price: 56000,
        description:
          "Elegant Friesian gelding with excellent training. Perfect for dressage and driving. Beautiful movement with great presence.",
        location: "Ocala, FL",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Wild Rose",
        breed: "Mustang",
        age: 5,
        height: 14.1,
        price: 8000,
        description:
          "Gentle mustang mare with natural athleticism. Great for trail riding and natural horsemanship. Very intelligent and willing.",
        location: "Elko, NV",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
      {
        name: "Golden Walker",
        breed: "Tennessee Walker",
        age: 8,
        height: 15.3,
        price: 25000,
        description:
          "Beautiful palomino Tennessee Walker with smooth gaits. Perfect for pleasure riding and showing. Very gentle and easy to handle.",
        location: "Franklin, TN",
        imageUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop",
      },
      {
        name: "Conquistador",
        breed: "Andalusian",
        age: 6,
        height: 15.2,
        price: 47000,
        description:
          "Magnificent Andalusian stallion with classical training. Excellent for haute école and dressage. Impressive movement and presence.",
        location: "Monterey, CA",
        imageUrl:
          "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=500&h=400&fit=crop",
      },
      {
        name: "Spirit Walker",
        breed: "Appaloosa",
        age: 6,
        height: 15.0,
        price: 20000,
        description:
          "Athletic Appaloosa gelding with excellent conformation. Great for western disciplines and trail riding. Very responsive and willing.",
        location: "Missoula, MT",
        imageUrl:
          "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&h=400&fit=crop",
      },
      {
        name: "Duke of Highlands",
        breed: "Clydesdale",
        age: 8,
        height: 17.0,
        price: 36000,
        description:
          "Impressive Clydesdale stallion with excellent bloodlines. Great for breeding and driving. Gentle temperament despite his impressive size.",
        location: "Versailles, KY",
        imageUrl:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=400&fit=crop",
      },
    ];

    // Insert all horses
    for (const horse of horseData) {
      await ctx.db.insert("horses", {
        ...horse,
        isAvailable: true,
        currency: "PLN",
        hasTUV: false,
      });
    }

    return `Successfully seeded ${horseData.length} horses!`;
  },
});
