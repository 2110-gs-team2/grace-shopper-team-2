const random = require("lodash/random");
const type = ["INDOOR", "SUCCULENT", "HERB"];
const size = ["X-SMALL", "SMALL", "MEDIUM", "LARGE"];
const light = ["LOW", "INDIRECT", "DIRECT"];
const difficulty = ["EASY", "MODERATE", "EXPERT"];
const boolean = [true, false];
const price = [59, 85, 108, 99, 49, 80, 45, 130, 50, 79, 83, 31];
const quantity = [35, 90, 80, 40, 50, 30, 105, 43, 94, 48, 24, 5];

const imageUrls = [
  "https://poshleaf-images.s3.amazonaws.com/the-sill_arrowhead-white-butterfly_medium_grant_cream_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_bird-of-paradise_large_variant_growpot_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_birds-nest-fern_variant_small_acadia_white_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_bromeliad-pink-antonio-small_bryant-black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_bromeliad-vriesea-vogue_small_bryant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_coffee-plant_variant_small_upcycled_stonewash_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_dracaena-marginata_medium_grant_cream_1_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_dracaena_large_growpot_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_draceana_large_growpot_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_easy-care-bundle_growpot_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_echeveria-lola_mini_upcycled-planter_cream_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_fan-palm_large_growpot_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_large-fiddle-leaf-fig-bush_variant_01_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_large-monstera_gallery_01_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_large-snake-plant-laurentii_variant_01_70374093-6cce-4e5b-8d95-37ceac4926bd_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_large-zz-plant_variant_01_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_majesty-palm_gallery_01_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_monstera-adansonii_large_variant_growpot_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_monstera-adansonii_variant_small_grant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_monstera-ginny_medium_hyde_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_monstera-hoya-bundle_hyde_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_monstera_variant_medium_grant_cream_5b593882-bf40-445c-be26-e8cd6b3ddbe1_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_parlor-palm_variant_medium_grant_cream_bb04b58f-0427-4f81-8c14-663676bbec67_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_peperomia-green_variant_medium_grant_cream_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_peperomia-green_variant_small_upcycled_stonewash_900x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_petite-orange-orchid_varient_x-small_bryant_cream_720x.png.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_petite-pink-orchid_varient_x-small_bryant_cream_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_philodendron-birkin_small_upcycled-stonewash_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_philodendron-green_variant_small_acadia_peach_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_pilea_variant_small_grant_black_900x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_pink-anthurium_small_bryant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_pink-orchid_small-bryant-black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_red-anthurium_small-bryant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_ric-rac-cactus_medium_grant_cream_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_schefflera-arboricola_large_growpot_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_silver-satin_small_upcycled-stonewash_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_snake-plant-laurentii_variant_medium_grant_light_pink_900x.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_spotted-orchid_small_bryant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_string-of-hearts_small_grant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_watercolor-blue-orchid_varient_small_bryant_blush_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_watercolor-pink-orchid_varient_small_bryant_cream_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_watercolor-purple-orchid_small_bryant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_white-orchid_small_bryant_black_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_white-orchid_variant_x-small_bryant_blush_720x.jpg.webp",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_xerographica-airplant_featured_720x.jpg.webp",
];

const products = [
  {
    name: "Anthurium Plant",
    description:
      "Anthurium is all about style. Magazine-cover style. Social-media-influencer style. Red-carpet style. With its big blooms, bold color and mood-lifting tropical vibe, we keep one to brighten up our home and another to give as a gift.",
  },
  {
    name: "Snake Plant Laurentii",
    description:
      'The Snake Plant Laurentii, or Sansevieria trifasciata "Laurentii", is a succulent plant characterized by its upright sword-like leaves with vibrant yellow edges. It is popular for its incredibly easy-going nature – it can tolerate low light and drought – and its air-purifying capabilities. The easiest way to kill this plant is to over care for it!',
  },
  {
    name: "ZZ Plant",
    description:
      "The ZZ Plant is characterized by its waxy green leaves above the surface of its potting mix, and its large potato-like rhizomes underneath. These rhizomes store water, making the ZZ a hardy, drought-tolerant houseplant that only needs water every few weeks.",
  },
  {
    name: "Peperomia Obtusifolia",
    description:
      "The Peperomia obtusifolia, also known as the Baby Rubber Plant, is an easy-going houseplant characterized by its thick, succulent-like green leaves. A popular variety of Peperomia, it does not need much to thrive and might even reward you with white flower spikes once a year.",
  },
  {
    name: "Parlor Palm",
    description:
      "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air purifying qualities.",
  },
  {
    name: "Philodendron Green",
    description:
      "Why is the Philodendron our most popular plant year after year? It could be its heart-shaped green leaves, easy-going nature, or quick-growing trailing vines. Snag this low-maintenance houseplant now to bring life to your space during the winter months ahead.",
  },
  {
    name: "Coffee Plant",
    description:
      "You might be surprised to know the same plant that grows your morning coffee beans is a popular, low maintenance houseplant! Although it’s unlikely this plant will produce berries inside, its attractive shiny green foliage will liven up any interior space. ",
  },
  {
    name: "Money Tree Plant",
    description:
      "Said to bring good luck and fortune, the Money Tree is the perfect plant to add to any room of your home to create good Feng Shui. It is known for its resilience, ease of growth, and fun braided trunk. ",
  },
  {
    name: "Bamboo Palm",
    description:
      "With dense foliage and lush fronds, the Bamboo Palm makes a statement. An air-purifying plant adaptable to low light, this palm can reach heights of up to 8 feet tall in the right conditions.",
  },
  {
    name: "Peperomia Piper",
    description:
      "The Peperomia Piper will check off all your boxes for the perfect easy-going plant. Requires little extra care, check. Pet and child friendly, check. Gorgeous trailing leaves, check. This succulent-like peperomia likes to dry between waterings and can be placed in low to indirect light. This peperomia can easily be propagated to share with others or grow your collection.",
  },
  {
    name: "Philodendron Heartleaf",
    description: "Trailing plant with whimsical heart-shaped leaves",
  },
  {
    name: "Red Bromeliad Guzmania",
    description:
      "This Red Bromeliad provides a vibrant splash of color that any plant parent can enjoy in their home year-round. Keep the center of the plant, known as the “vase,” halfway filled with water and water the soil sparingly. Keep in indirect light and boost humidity around your plant by using a mister.",
  },
  {
    name: "White Orchid",
    description:
      "With its elegant stems and vibrant white flowers, this Phalaenopsis orchid makes any space feel more chic. You may notice a small amount of blooms on your orchid upon delivery. These blooms will open quicker in a warm indoor setting. The Phalaenopsis will typically bloom about once a year, for up to three months. After a blooming cycle, the flowers will wilt and fall off. This is the orchid’s way to store up energy to re-bloom again next season. ",
  },
  {
    name: "Silver Satin",
    description:
      "The Silver Satin vine, or Scindapsus pictus, is a low maintenance plant that will add a bit of flare to any sill or shelf with its silvery variegation that catches and reflects light. Added bonus – it is easy to propagate a cutting of this plant in water!",
  },
  {
    name: "Fiddle Leaf Fig",
    description:
      "Tall, sculptural, and dramatic. This plant will flourish in the right conditions.",
  },
  {
    name: "Aralia Ming Stump",
    description:
      "Totally unique and utterly adorable, our aralia ming stump for delivery will add an eye-catching touch to your home. Their fluffy foliage makes them one of the most distinct shrub plants, with a pale green color on top and deep purple on the bottom. Not only are they easy to care for, but they also act as a natural air purifier.",
  },
  {
    name: "Spider Plant",
    description:
      "Our spider plants bring the lush jungles of Southern Africa to your home. One of the best air purifying plants, we love them for their spiky variegated foliage. They are easy to care for and look great set on a table-top or hung from a macrame sling. You can even keep them out on the patio during summer — just remember to bring them inside if there's any risk of frost.",
  },
  {
    name: "Giant Bird of Paradise",
    description:
      "Commonly known as the Giant White Bird of Paradise, the Strelitzia Nicolai is a flowering plant that is native to South Africa. They are similar to the Orange Bird of Paradise but can grow to be much, much taller.",
  },
  {
    name: "Jade",
    description:
      "Make nature into art with our Jade plant (Crassula ovata). Their thick evergreen branches with shiny leaves can reach up to 5 ft. tall, 3 ft. wide, and is almost indestructible. Jade plants are feng shui plants that are thought to bring prosperity and luck to the owner. Set them in an entryway or southeast corner and let success reign.",
  },
  {
    name: "Dracaena Marginata Open Weave",
    description:
      "A fun and bold Dracaena variety with woven tree stems and spiky, upright leaves. Also known as the Madagascar Dragon Tree, this potted tree is 4-5 feet tall and has been recognized for its air-purifying qualities.",
  },
  {
    name: "Croton Petra",
    description:
      "Add some color to your home with this medium croton petra. This gorgeous tropical plant thrives in brightly lit spots. The more sun they get, the more rainbow shades will appear in their variegated foliage. You can usually expect warm stripes of red, pink, and yellow contrasting with dark green. Bright and bold, they are surprisingly easy to care for.",
  },
  {
    name: "Lemon Button Fern",
    description:
      "Add this little 'Lemon Button' fern to your collection, a smaller version of the Boston fern. This one has a lemony fragrance when the leaves are crushed or brushed. Only growing a foot high, they make a beautiful ensemble with other tropicals. They are small, and finely-textured leaves are a nice contrast to larger leaf tropicals.",
  },
  {
    name: "English Ivy Green Ideal",
    description:
      "If you're looking for hanging plants for delivery, try our English ivy. Tough but pretty, they stay green all year round and is quite happy in shady spots. They are a natural climber and will crawl and trail for up to ten feet. They are easy to care for, too, so with minimal effort, you can get those country manor vibes.",
  },
  {
    name: "Areca Butterfly Palm",
    description:
      "Enjoy the soft, fine textured arching fronds of the Arecas palm (Dypsis lutescens) as an indoor house plant or in the garden in warmer zones of the country. Place them where there is headroom to grow, like in a foyer stairwell or outside porch area in a container.",
  },
  {
    name: "Janet Craig Dragon Plant",
    description:
      "Try this virtually indestructible plant that thrives on low light and little water. The Dracaena 'Janet Craig' is perfect for people on the go with little time to waste! They even earn their keep by cleaning the air of nasty toxins! Their sword-like dark green 3 inches wide and eventually 2 feet long leaves fill out the mature stalk giving you that tropical vibe in your casa.",
  },
  {
    name: "Staghorn Fern",
    description:
      "Staghorn fern (Platycerium Bifurcatum) makes an attractive ornamental sculpture for a wall indoors or seasonally outdoors in warmer climates. The Royal Horticulture Society Award of Garden Merit gave the nod to this plant in 1993. Their sterile heart-shaped basal fronds overlap and shield the base of the fern's roots. Initially dull green and succulent, they turn papery tan to cinnamon-brown with age.",
  },
  {
    name: "Dieffenbachia Tiki",
    description:
      "The Dieffenbachia Maculata 'Tiki' (Dumb Cane) may be considered the god of Dieffenbachia's with their larger stature and exotic leaf pattern and color. This plant will get a lot of attention no matter what angle you view them in since its leaves are a mixture of speckled on the underside and painted with silvery-white on the topside. Their larger leaves with unusual markings will grab your attention from all sides!",
  },
  {
    name: "Peperomia Frost",
    description:
      "The Peperomia Frost (Peperomia caperata) forms a mound of leaves that protrude out with slim, vertical petioles. Their shiny leaves appear to have a frosted look with green veins, and they grow to a height of 8 inches. In their native habitat, they're found in the cracks of trees or around rotting bark growing similarly to epiphytes. They enjoy a well-draining, rich organic mix to thrive.",
  },
  {
    name: "Sansevieria Cylindrica Braid",
    description:
      "This braided snake plant makes a statement with their bonsai presentation. Spear Sansevieria (Dracaena angolensis) has a unique leaf shape that is upright, dense, and cylindrical-shaped leaves that come to a point on the ends. The leaves grow in a vertical line radiating from the basal rosette causing them to look like a shooting star. This succulent withstands drought well. An easy-care-for plant to have and exotic conversational piece. ",
  },
  {
    name: "Ric Rac Cactus",
    description:
      "The Ric Rac Cactus will win over any plant parent: Not only is it pet-friendly and easy to care for, but it offers ric rac- or fishbone-shaped trailing stems and the occasional night-blooming flower. It is considered non-toxic, safe to keep around curious cats and dogs.",
  },
  {
    name: "Preserved Fern Kokedama",
    description:
      "A traditional Japanese art form, the word Kokedama translates to ’moss ball’. There is no upkeep necessary with this preserved fern kokedama – simply hang and enjoy, or sit on a flat surface. This is a real kokedama that has been naturally preserved. It is non-toxic and environmentally friendly. Each kokedama is handcrafted and unique – natural variations will occur. There might be a slight odor upon unpacking your kokedama, but it will subside in about 3 weeks. Keep it out of direct light and never water. ",
  },
  {
    name: "Dracaena Marginata",
    description:
      "The Dracaena marginata, or Dragon Tree, is a popular low-maintenance plant native to Madagascar. Its unique silhouette and height make it our go-to pick for upgrading any corner! Sized to ship best, our large Dracaena arrives with room to grow as it adapts to your home’s conditions.",
  },
  {
    name: "Hoya Heart",
    description:
      "The Hoya kerrii is commonly called the Hoya Heart because of its green heart-shaped leaves. This single leaf cutting is a fun, whimsical way to show your plant love. It is partially rooted but does not have a node. It will stay as an adorable heart-shaped leaf for years to come.",
  },
  {
    name: "Pilea Peperomioides",
    description:
      "The Pilea peperomioides is also known as the Pancake Plant or UFO Plant because of its quirky, coin-shaped leaves. This easy-care plant is a self-propagator – it produces sweet little babies or “pups” on its own, which pop up from the soil surrounding the mother plant.",
  },
  {
    name: "Red Chinese Evergreen Plant",
    description:
      "Is it a plant or is it a painting? Okay, we know it’s a plant…but the color combos are a work of art. Bright, without being brash, it stands out in a sea of green and brings a little warmth to minimalist styling. We keep it simple in a white or black ceramic pot and let the leaves do the talking.",
  },
  {
    name: "Clover Leaf Ivy",
    description:
      "Known as Hedera helix or 'Shamrock' Ivy is an award winner!  This Ivy won Ivy of the Year by the American Ivy Society several times. They get their name from their three rounded equally sized leaves resembling a shamrock as the outer leaves overlap the center one. They are suited for indoor planting or shady spots in the garden protected from winter sun and wind. They are best kept in a container as they can take over a garden bed quickly.  Enjoy your plant hanging in the original grower pot, or remove the hanger and admire them in the decorative pot of your choosing!",
  },
  {
    name: "Philodendron Xanadu",
    description:
      "Xanadu philodendron (Thaumatophyllum xanadu) is a big-leaf tropical plant with dark green foliage with 15-20 lobes. They can grow in outdoor settings 5 feet tall and 7 feet wide. They may even sprout a few aerial roots as if they were still in the tropical forest. They prefer part shade in the morning light but inside can be kept in a medium-lit space. Xanadu is a beautiful specimen plant indoors or outside in warmer climates.",
  },
  {
    name: "Ficus Audrey",
    description:
      "Ficus Audrey (Ficus benghalensis) gets your attention with her velvet green leaves. Pale green veins define the elliptical-shaped leaves. This plant is an epiphyte in the wild and puts out aerial roots to penetrate the ground. While they grow enormously in their native land, they'll be on its best behavior and be a statue of luxury in your home, reaching 10 feet tall and 3 feet wide typically. Audrey is not as fussy as her cousin Ficus lyrata and can recover quicker when stressed.",
  },
  {
    name: "Dieffenbachia Camouflage",
    description:
      "Dieffenbachia 'Camouflage' features lush chartreuse leaves. The lanceolate shaped leaves are divided by a white central midrib with specks of green throughout the leaf. They are an easy to care for plant. Give them bright, indirect light and consistent water. Wear gloves when touching as the plant can cause skin dermatitus.",
  },
  {
    name: "Rex Begonia Jurassic Jr Rose Splash",
    description:
      "Jurassic Jr.™ Rose Splash Rex Begonia (Begonia rex-cultorum) will make you blush as if her leaves have kissed you. She's a stand-alone and swoon-worthy. Her asymmetrically leaves point like she is guiding you down a hidden trail to follow for a special rendezvous! Her colorful foliage of rosy red stands 14-16 inches tall and 18-10 inches wide. Her veining skips between black and creamy white, making her a marvel to enjoy!",
  },
  {
    name: "Sansevieria",
    description:
      "Architectural and sturdy, this plant is easy to care for and highly adaptable. Also known as a Snake Plant and Mother-in-Law’s Tongue.",
  },
  {
    name: "Ponytail Palm",
    description:
      "Fun, distinct, and hardy. This plant is low-maintenance and adaptable",
  },
  {
    name: "Ficus Danielle",
    description:
      "The Ficus Danielle provides a classic touch of beauty in any home. Keep this plant happy with indirect bright light, as it will not tolerate low light. Let the soil dry some between waterings and dust the foilage regularly to keep the gorgeous round leaves dust and pest free.",
  },
  {
    name: "Dracaena Green Jewel",
    description:
      "The Dracaena Green Jewel is known for its compact, emerald green leaves atop sturdy canes. This distinctive Dracaena in low maintenance and can tolerate a wide range of lighting, making it the perfect plant for virtually any spot in your home. Allow the soil to dry between waterings and place in low to indirect bright light to keep this plant happy. Dust the leaves regularly to keep the shiny leaves brilliant and deter pests.",
  },
  {
    name: "Rhapis Palm",
    description:
      "A lively, architectural palm with fanlike fronds, the Rhapis Palm is a no-fuss tabletop plant ideal for end tables, bookcases, or shelves. Enjoying low to bright indirect sunlight, this pet-friendly palm makes for a nice leafy addition to any home.",
  },
  {
    name: "Large Dracaena",
    description:
      "The Dracaena livens up indoor spaces with a verdant hue and corn stalk-like silhouette. It also claims a spot on NASA’s list of the world's top air-purifying plants. It is happiest in brighter light with less frequent waterings, but can tolerate lower light. Sized to ship best, our large Dracaena arrives with room to grow as it adapts to your home’s conditions.",
  },
  {
    name: "Large Monstera Adansonii",
    description:
      "Monstera Adansonii are known for their lacy green leaves, covered with natural leaf-holes called fenestrations. The 'Swiss Cheese Plant' also boasts soft yet resilient stems that can be trained to climb, hang, or trail. Sized to ship best, our large Monstera Adansonii arrives with room to grow as it adapts to your home’s conditions.",
  },
  {
    name: "String of Hearts",
    description:
      "Our String of Hearts is a lovely trailing succulent known for its heart-shaped leaves and tolerant nature. It can propagate quickly due to its shallow roots and ability to grow new roots and vines easily. We recommend putting it on an elevated surface like a bookshelf to give it space to cascade.",
  },
  {
    name: "Bromeliad Vriesea Vogue",
    description:
      "The Bromeliad Vriesea Vogue is one of the most beautiful and distinctive pet-friendly plants, with a cone-like red and yellow spike that sometimes produces flowers. The colorful bract has earned this bromeliad the nickname Flaming Sword Plant.",
  },
  {
    name: "Philodendron Birkin",
    description:
      "The Philodendron Birkin is characterized by its lush green leaves with white or yellow pinstripes. A unique hybrid, you won't find this plant in the wild. It is a slow growing plant that can reach up to 3 feet tall indoors if well cared for.",
  },
];

products.forEach((p, idx) => {
  p.price = price[random(0, price.length - 1)];
  p.type = type[random(0, type.length - 1)];
  p.size = size[random(0, size.length - 1)];
  p.light = light[random(0, light.length - 1)];
  p.difficulty = difficulty[random(0, difficulty.length - 1)];
  p.isPetFriendly = boolean[random(0, boolean.length - 1)];
  p.quantity = quantity[random(0, quantity.length - 1)];
  p.slug = p.name.replace(/\s+/g, "-").toLowerCase();
  const imageArr = new Array(3).fill(0);
  p.imageUrl = imageArr.map(
    (elem) => (elem = imageUrls[random(0, imageUrls.length - 1)])
  );
  if (idx % 11 === 0) p.isNew = true;
  if (idx % 12 === 0) p.isStaffFavorite = true;
});

module.exports = products;
