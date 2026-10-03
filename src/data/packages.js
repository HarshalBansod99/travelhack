

export const packages = [
  {
    id: 1,
    slug: 'manali-solang-atal-tunnel-kasol-manikaran',
    title: 'Manali – Solang, Atal Tunnel, Kasol, Manikaran',
    category: 'Group',
    region: 'North India',
    destination: 'Himachal',
    duration: '6D/5N (Itinerary spans Day 1–Day 7)',
    groupSize: 'Group',
    startingPrice: 8999,
    highlights: [
      'Hadimba Devi Temple & Old Manali Café exploration',
      'Solang Valley snow activities & Atal Tunnel visit',
      'River rafting & paragliding at Kullu (self-paid)',
      'Kasol camping with bonfire & DJ night',
      'Manikaran Sahib Gurudwara & hot water spring',
      'Jogini Waterfall & Vashisht Temple sightseeing',
    ],
    description: 'From the snow-capped peaks of Solang Valley to the hippie vibes of Kasol — this trip packs seven days of mountains, temples, adventure, and campfire nights. Starting from Nagpur via Delhi, explore Manali\'s iconic Hadimba Devi Temple, Mall Road, and Old Manali cafés. Take on snow activities at Solang Valley, cross through the engineering marvel of Atal Tunnel, and end with riverside camping at Kasol complete with bonfire, DJ night, and a visit to the sacred Manikaran Sahib Gurudwara.',
    image: '/images/Atal Tunnel/SUR_0096.JPG',
    gallery: [
      '/images/Atal Tunnel/SUR_0167.JPG',
      '/images/Hidimba Temple/SUR_0495.JPG',
      '/images/General Photos/DSC_0165.JPG',
      '/images/Atal Tunnel/SUR_0251.JPG',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nagpur to Delhi',
        description: 'Departure from Nagpur to Delhi via train. Overnight journey to Delhi.',
      },
      {
        day: 2,
        title: 'Delhi Arrival & Departure for Manali',
        description: 'Arrive at Delhi Junction in the morning. Take some rest in the waiting room. Depart for Manali from the respective location at approximately 5:00 PM. Overnight journey to Manali.',
      },
      {
        day: 3,
        title: 'Manali Local Sightseeing',
        description: 'Enjoy the mountains and rivers of Manali during the journey. Reach Manali 3-star hotels between approximately 11:00 AM and 1:00 PM. Check into the hotel. Take approximately 2–3 hours of rest. Go for local sightseeing: Hadimba Devi Temple, Mall Road, Old Manali Café, Vashisht Temple, Van Vihar, Jogini Waterfall, and other local places. After sightseeing, return to the hotel. Dinner. Bonfire.',
      },
      {
        day: 4,
        title: 'Solang Valley / Atal Tunnel',
        description: 'Start the day with breakfast at the hotel. Depart for Solang Valley or Sissu / Atal Tunnel. Enjoy snow activities (snow activities are self-paid). After spending time at Solang Valley, return to the hotel. Dinner and overnight stay at the hotel.',
      },
      {
        day: 5,
        title: 'Manali to Kasol',
        description: 'Have breakfast. Check out from the Manali hotel. Depart for Kasol camps. Travel through Manali and Kullu with sightseeing along the way. On the way to Kasol, visit Kullu for river rafting and paragliding (both self-paid). Reach Kasol camps by evening. Camping. Dinner. Bonfire. DJ night. Overnight experience at Kasol camps.',
      },
      {
        day: 6,
        title: 'Manikaran + Kasol + Delhi',
        description: 'Have morning breakfast. Depart for Manikaran Sahib Gurudwara. Visit the hot water spring. Return and explore Kasol Market / Mall Road. Visit Nature Park beside the river. Depart for Delhi in the evening. Overnight journey to Delhi.',
      },
      {
        day: 7,
        title: 'Delhi to Nagpur',
        description: 'Arrive in Delhi in the morning. Depart from Delhi for Nagpur on the same day.',
      },
    ],
    inclusions: [
      '2 nights stay in Manali 3-star hotels',
      '1 night stay in Kasol camps',
      '6 meals total (Day 3: Dinner | Day 4: Breakfast, Dinner | Day 5: Breakfast, Dinner | Day 6: Breakfast)',
      'Trip captain from Delhi to Delhi',
      'Camping, DJ night & bonfire at Kasol',
      '24×7 assistance',
      'Guide while trekking',
    ],
    exclusions: [
      'Adventure activities (self-paid)',
      'Any additional personal expenses',
      'Meals not mentioned in the package',
      'Meals during the journey / on-the-way meals (self-paid)',
      'Additional accommodation or food expenses caused by delayed travel',
      'Any other service not specifically mentioned in the inclusions',
      'Insurance is not provided',
    ],
    pricing: [
      { type: '4 persons in one room', price: '₹8,999/person' },
      { type: '3 persons in one room', price: '₹9,499/person' },
      { type: '2 persons in one room', price: '₹9,999/person' },
    ],
    termsAndConditions: [
      'Facilities that are not mentioned in the package are excluded.',
      'In case of cancellation, the advance booking payment is non-refundable.',
      'The organizer states that they are responsible for delayed train timings.',
      'No insurance policy is provided to cover sickness, accidents, theft, or other losses.',
      'Full payment of the trip cost must be made before the trip begins.',
      'Pending payments may eventually lead to cancellation of the trip.',
      'IDs will be verified before boarding.',
      'No boarding will be permitted without a valid government ID.',
    ],
    importantNote: 'The cover page states the package duration as "6D/5N". However, the detailed itinerary explicitly describes Day 1 through Day 7 (7 calendar days). The accommodation includes 2 nights in Manali + 1 night in Kasol. Delhi accommodation is not explicitly included — the waiting-room rest is mentioned on Day 2.',
  },
];

export const categories = [
  { id: 'all', label: 'All Trips', icon: 'Globe' },
  { id: 'Group', label: 'Group Tours', icon: 'Users', description: 'Travel with a crew, make new friends', image: '/images/General Photos/DSC_0167.JPG' },
];

export const regions = [
  { id: 'all', label: 'All Regions' },
  { id: 'North India', label: 'North India' },
];
