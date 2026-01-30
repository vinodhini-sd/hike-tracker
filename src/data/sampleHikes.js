// Sample California coastal and redwood hikes for 2026
export const sampleHikes = [
  {
    id: 1,
    name: "Dipsea Trail to Stinson Beach",
    date: "2026-01-15",
    difficulty: "Hard",
    distance: 7.4,
    elevation: 1360,
    duration: 195, // minutes
    lat: 37.8974,
    lng: -122.6019,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/dipsea-trail",
    summary: "Started the year with this classic Marin County challenge. The fog was rolling in as I descended the steep stairs into Muir Woods, creating an ethereal atmosphere through the redwood groves. The final stretch along the beach was perfect for reflection."
  },
  {
    id: 2,
    name: "Point Lobos Coastal Loop",
    date: "2026-01-22",
    difficulty: "Easy",
    distance: 4.2,
    elevation: 280,
    duration: 90,
    lat: 36.5164,
    lng: -121.9481,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/point-lobos-loop-trail",
    summary: "A peaceful morning walk along the 'Crown Jewel of the State Park System.' Spotted harbor seals lounging on the rocks and watched sea otters playing in the kelp beds. The cypress groves offered beautiful framing for ocean views."
  },
  {
    id: 3,
    name: "Ewoldsen Trail - Big Sur",
    date: "2026-02-08",
    difficulty: "Moderate",
    distance: 4.7,
    elevation: 1600,
    duration: 150,
    lat: 36.2505,
    lng: -121.8184,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/ewoldsen-trail",
    summary: "This Julia Pfeiffer Burns loop delivered everything Big Sur promises. The trail wound through ancient redwoods before emerging onto a stunning canyon overlook. Wildflowers were just beginning to bloom on the exposed ridgeline."
  },
  {
    id: 4,
    name: "Skyline to the Sea Trail - Section 1",
    date: "2026-02-22",
    difficulty: "Strenuous",
    distance: 12.5,
    elevation: 2800,
    duration: 360,
    lat: 37.2350,
    lng: -122.1500,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/skyline-to-the-sea-trail",
    summary: "Tackled the first major section of this epic trail. From Castle Rock through dense redwood forests and across Waddell Creek, every mile revealed something new. The backcountry campsite was worth the effort—fell asleep to the sound of owls."
  },
  {
    id: 5,
    name: "Bodega Head Loop",
    date: "2026-03-05",
    difficulty: "Easy",
    distance: 2.8,
    elevation: 180,
    duration: 60,
    lat: 38.3058,
    lng: -123.0650,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/bodega-head-loop",
    summary: "A windy but spectacular Sonoma Coast hike. Gray whales were migrating north, and I counted at least six spouts from the headland. The wildflowers on the bluffs were stunning—yellow lupine and orange poppies everywhere."
  },
  {
    id: 6,
    name: "Redwood Creek Trail to Tall Trees Grove",
    date: "2026-03-18",
    difficulty: "Moderate",
    distance: 8.2,
    elevation: 750,
    duration: 210,
    lat: 41.2128,
    lng: -124.0046,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/tall-trees-grove-trail",
    summary: "Made the pilgrimage to stand among the tallest trees on Earth. The permit-only access meant I had the grove nearly to myself. Standing at the base of these ancient giants, some over 350 feet tall, was genuinely humbling."
  },
  {
    id: 7,
    name: "Fern Canyon Loop",
    date: "2026-03-19",
    difficulty: "Easy",
    distance: 1.1,
    elevation: 120,
    duration: 45,
    lat: 41.4008,
    lng: -124.0656,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/fern-canyon-loop-trail",
    summary: "A short but unforgettable walk through walls of five-fingered ferns. The canyon feels like stepping into a prehistoric world—no surprise it was used in Jurassic Park filming. Light rain added to the atmosphere."
  },
  {
    id: 8,
    name: "Matt Davis Trail to Pantoll",
    date: "2026-04-02",
    difficulty: "Hard",
    distance: 6.8,
    elevation: 1850,
    duration: 180,
    lat: 37.9044,
    lng: -122.6047,
    alltrailsUrl: "https://www.alltrails.com/trail/us/california/matt-davis-trail",
    summary: "Spring wildflower explosion on Mt. Tamalpais! The trail was lined with iris, buttercups, and California poppies. Challenging climbs rewarded with sweeping views from Stinson Beach to the Farallon Islands."
  }
];

export const difficultyColors = {
  Easy: 'bg-emerald-500',
  Moderate: 'bg-amber-500',
  Hard: 'bg-orange-500',
  Strenuous: 'bg-redwood'
};

export const difficultyTextColors = {
  Easy: 'text-emerald-600',
  Moderate: 'text-amber-600',
  Hard: 'text-orange-600',
  Strenuous: 'text-redwood'
};
