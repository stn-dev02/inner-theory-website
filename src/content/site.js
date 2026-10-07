/**
 * Every word, price, and treatment on the page comes from this file.
 * Edit here - not in the components.
 *
 * PLACEHOLDERS to replace before launch: clinic address/phone/email/hours,
 * clinician names and credentials, licence number, and all prices.
 */

export const clinic = {
  name: 'Inner Theory',
  kind: 'Wellness clinic',
  shortPitch: 'Physician-led skin, body, and longevity care on a schedule you can keep.',
  address: ['218 Linden Street, Suite 400', 'Portland, OR 97209'],
  phone: '(503) 555-0142',
  phoneHref: 'tel:+15035550142',
  email: 'front@innertheory.co',
  instagram: '@innertheory',
  instagramHref: 'https://instagram.com',
  hours: [
    ['Tue - Thu', '9:00 - 19:00'],
    ['Fri - Sat', '9:00 - 17:00'],
    ['Sun - Mon', 'Closed'],
  ],
  licence: 'OR Medical Practice Lic. #MP-40118',
};

export const nav = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Clinicians', href: '#clinicians' },
  { label: 'Costs', href: '#costs' },
  { label: 'Questions', href: '#questions' },
];

export const hero = {
  eyebrow: 'Portland, OR / Est. 2019',
  headline: ['Skin is a system.', 'We treat it like one.'],
  body:
    'No guesswork, no package pressure. You get a map of what is actually happening under ' +
    'the surface, the depth each treatment works at, and the real downtime - in writing, ' +
    'before you book anything.',
  primaryCta: { label: 'Book a consult', href: '#book' },
  secondaryCta: { label: 'See the depth map', href: '#treatments' },
  stats: [
    ['Clinicians on staff', '6'],
    ['Typical plan length', '12 wks'],
    ['Consults we decline', '1 in 9'],
  ],
};

/* ---- Hero intake panel. Each concern renders a sample protocol. ---- */

export const intake = {
  label: 'Intake',
  prompt: 'What brings you in?',
  note: 'Sample protocols. Yours is set in person, after a skin reading.',
  fields: { depth: 'Works at', interval: 'Interval', downtime: 'Downtime', change: 'First change' },
  concerns: [
    {
      id: 'lines',
      chip: 'Fine lines',
      protocol: 'Neuromodulator, three areas',
      depthMm: 2.5,
      depthNote: 'intramuscular',
      interval: 'Once, repeat at 12-16 wks',
      downtime: 'None',
      firstChange: 'Day 4-7',
    },
    {
      id: 'texture',
      chip: 'Texture & pores',
      protocol: 'Microneedling RF, then a light peel',
      depthMm: 2.0,
      depthNote: 'mid dermis',
      interval: '3 visits, 4 wks apart',
      downtime: '2 days pink',
      firstChange: 'Week 3',
    },
    {
      id: 'laxity',
      chip: 'Laxity',
      protocol: 'Biostimulator with bipolar RF',
      depthMm: 4.5,
      depthNote: 'subdermal',
      interval: '2 visits, 6 wks apart',
      downtime: '1 day tender',
      firstChange: 'Week 6, as collagen builds',
    },
    {
      id: 'pigment',
      chip: 'Pigment & sun damage',
      protocol: '1927 nm thulium, plus a home tyrosinase inhibitor',
      depthMm: 0.25,
      depthNote: 'epidermis',
      interval: '2 visits, 6 wks apart',
      downtime: '4 days flaking',
      firstChange: 'Week 2',
    },
    {
      id: 'energy',
      chip: 'Low energy',
      protocol: 'Biomarker panel first, then IV or a hormone plan',
      depthMm: null,
      depthNote: 'systemic',
      interval: 'Panel, recheck at 8 wks',
      downtime: 'None',
      firstChange: 'Week 2-4, once labs are back',
    },
  ],
};

/* ---- The depth map: the organising idea of the page. ---- */

export const depthMap = {
  label: 'Treatments',
  title: 'Sorted by how deep they actually work',
  body:
    'Most menus sort treatments by price. We sort them by the layer they act on, because ' +
    'that is what decides your downtime, how long a result holds, and whether two things ' +
    'can be done in one sitting.',
  hint: 'Open a layer to see what sits there.',
  layers: [
    {
      id: 'surface',
      name: 'Surface',
      range: '0 - 0.1 mm',
      summary: 'Dead cell layer and pore debris. Nothing heals, so nothing is down.',
      treatments: [
        {
          name: 'Hydradermabrasion facial',
          depth: '0.1 mm',
          downtime: 'None',
          time: '50 min',
          price: '$185',
          detail:
            'Vacuum exfoliation, acid loosen, serum infuse. The one treatment you can have ' +
            'on a Friday and still look normal on Friday night.',
        },
        {
          name: 'Dermaplaning',
          depth: '0.05 mm',
          downtime: 'None',
          time: '30 min',
          price: '$95',
          detail:
            'A blade shave of vellus hair and stratum corneum. Makeup sits flatter for about ' +
            'ten days. No, it does not make the hair grow back coarser.',
        },
      ],
    },
    {
      id: 'epidermis',
      name: 'Epidermis',
      range: '0.1 - 0.5 mm',
      summary: 'Where pigment lives. Treat it and you will flake for a few days.',
      treatments: [
        {
          name: 'Medium-depth peel',
          depth: '0.3 mm',
          downtime: '3 days flaking',
          time: '45 min',
          price: '$320',
          detail:
            'A layered acid taken to the papillary edge. Best booked on a Wednesday so the ' +
            'shedding has finished by the weekend.',
        },
        {
          name: '1927 nm thulium resurfacing',
          depth: '0.25 mm',
          downtime: '4 days',
          time: '60 min',
          price: '$700',
          detail:
            'A water-absorbed wavelength that lifts sun damage and melasma without reaching ' +
            'the dermis. Our workhorse for pigment.',
        },
      ],
    },
    {
      id: 'dermis',
      name: 'Dermis',
      range: '0.5 - 2.5 mm',
      summary: 'Collagen and elastin. Results arrive in weeks rather than days, and they hold.',
      treatments: [
        {
          name: 'Microneedling RF',
          depth: '2.0 mm',
          downtime: '2 days pink',
          time: '75 min',
          price: '$650',
          detail:
            'Insulated needles deliver heat at a set depth, so a scarred cheek can be treated ' +
            'at 2 mm and a thin lower lid at 0.5 mm in the same session.',
        },
        {
          name: '1550 nm fractional laser',
          depth: '1.2 mm',
          downtime: '5 days',
          time: '60 min',
          price: '$900',
          detail:
            'Columns of coagulation with untreated skin left between them. The strongest ' +
            'texture result we offer that still leaves the surface intact.',
        },
        {
          name: 'PRF biostimulation',
          depth: '1.5 mm',
          downtime: '1 day bruising',
          time: '60 min',
          price: '$550',
          detail:
            'Your own platelet-rich fibrin, spun from a draw taken at the start of the visit, ' +
            'placed where tissue is thinning. There is no filler in it.',
        },
      ],
    },
    {
      id: 'subdermal',
      name: 'Sub-dermal & muscle',
      range: '2.5 - 6 mm',
      summary: 'Structure and movement. Quick to show, and the layer that needs the steadiest hand.',
      treatments: [
        {
          name: 'Neuromodulator',
          depth: '2.5 mm',
          downtime: 'None',
          time: '20 min',
          price: '$14 / unit',
          detail:
            'Dosed per muscle, not per face. It wears off at 12-16 weeks, which makes a result ' +
            'you dislike temporary by design.',
        },
        {
          name: 'HA filler',
          depth: '4.0 mm',
          downtime: '1-2 days swelling',
          time: '45 min',
          price: '$750 / syringe',
          detail:
            'Placed on bone where the face has lost projection, not under the surface to plump ' +
            'it. Dissolvable with hyaluronidase if you change your mind.',
        },
        {
          name: 'Poly-L-lactic biostimulator',
          depth: '4.5 mm',
          downtime: '1 day tender',
          time: '45 min',
          price: '$850 / vial',
          detail:
            'Not a filler. It asks your own collagen to rebuild across three months, then ' +
            'resorbs. Nothing to see for six weeks - plan around that.',
        },
      ],
    },
    {
      id: 'systemic',
      name: 'Systemic',
      range: 'Whole body',
      summary: 'For when the skin complaint is downstream of sleep, iron, thyroid, or stress.',
      treatments: [
        {
          name: 'Biomarker panel',
          depth: 'Blood draw',
          downtime: 'None',
          time: '15 min',
          price: '$395',
          detail:
            '62 markers across thyroid, iron, metabolic, inflammatory, and sex hormones. Read ' +
            'back to you by a physician rather than emailed as a PDF.',
        },
        {
          name: 'IV micronutrient therapy',
          depth: 'Intravenous',
          downtime: 'None',
          time: '45 min',
          price: '$225',
          detail:
            'Only once a panel shows a deficiency worth correcting. We decline this more often ' +
            'than you would expect.',
        },
        {
          name: 'Hormone & metabolic consult',
          depth: 'Consult',
          downtime: 'None',
          time: '50 min',
          price: '$250',
          detail:
            'A physician hour for perimenopause, testosterone, thyroid, or weight that has ' +
            'stopped responding. Prescribing only where it is indicated.',
        },
      ],
    },
  ],
};

/* ---- The schedule. Stamped with real intervals, not step numbers. ---- */

export const schedule = {
  label: 'Schedule',
  title: 'What the first twelve weeks look like',
  body:
    'A plan is only worth writing if you can tell afterwards whether it worked. This is the ' +
    'shape of every course of care here.',
  steps: [
    {
      stamp: 'Day 0',
      duration: '60 min / $95',
      title: 'Consult and skin reading',
      body:
        'Standardised photos in fixed lighting, a hydration and elasticity reading, and twenty ' +
        'minutes of questions about sleep, sun, medication, and what you actually want to look ' +
        'like. You leave with a written plan and its price. The $95 comes off your first treatment.',
    },
    {
      stamp: 'Day 1-14',
      duration: 'Varies by plan',
      title: 'First treatment',
      body:
        'We treat the deepest layer in the plan first, because everything above it heals faster. ' +
        'You get the downtime window in writing before you pick a date, so it lands on a week ' +
        'you can afford to look like you had something done.',
    },
    {
      stamp: 'Week 4',
      duration: '20 min / no charge',
      title: 'Check-in',
      body:
        'A short visit, with new photos in the same lighting as Day 0. If a device is not earning ' +
        'its place in the plan, we drop it rather than finish the series.',
    },
    {
      stamp: 'Week 12',
      duration: '40 min / no charge',
      title: 'Recheck, against your own words',
      body:
        'Side-by-side photos, a second elasticity reading, and the goal you gave us on Day 0 read ' +
        'back to you. Then we decide together what the next twelve weeks need, which is sometimes ' +
        'nothing at all.',
    },
  ],
};

export const clinicians = {
  label: 'Clinicians',
  title: 'Who is actually holding the needle',
  body:
    'Six clinicians, and one medical director who reviews every plan before a needle leaves the ' +
    'drawer. Ask for someone by name when you book - you will see the same face each visit.',
  people: [
    {
      name: 'Dr. Amara Okonkwo',
      creds: 'MD, FAAD / Medical director',
      years: '14 yrs',
      focus: 'Pigment disorders, melasma, hormone-driven skin change',
      note:
        'Board-certified in dermatology. Signs off on every treatment plan in the clinic, and runs ' +
        'the Day 0 skin reading for anything involving a laser.',
    },
    {
      name: 'Priya Raghunathan',
      creds: 'RN, BSN / Lead injector',
      years: '9 yrs',
      focus: 'Neuromodulators, structural filler, biostimulators',
      note:
        'Past 11,000 injection appointments. Teaches facial anatomy and vascular safety for a ' +
        'regional training programme two weekends a month.',
    },
    {
      name: 'Marco Delgado',
      creds: 'LE, CLT / Master esthetician',
      years: '11 yrs',
      focus: 'Device resurfacing, acne scarring, barrier repair',
      note:
        'Certified on every laser and RF platform on the floor. The person to ask if your barrier ' +
        'is wrecked from over-treating somewhere else.',
    },
  ],
};

export const costs = {
  label: 'Costs',
  title: 'What it costs, before you are in the chair',
  body:
    'Published ranges, because a price you have to ask for is usually a price built to be ' +
    'negotiated. The written plan you get on Day 0 carries exact figures.',
  rows: [
    ['Consult and skin reading', '$95', 'Credited to your first treatment'],
    ['Surface treatments', '$95 - $185', 'No downtime, book any day'],
    ['Peels and resurfacing', '$320 - $900', 'A series of three is priced at 2.5x'],
    ['Injectables', '$14 / unit, $750 - $850 / syringe', 'Dosed per muscle, priced per unit'],
    ['Panels and IV', '$225 - $395', 'IV only once a panel justifies it'],
  ],
  membership: {
    label: 'Membership',
    name: 'The Interval',
    price: '$240 / month',
    body:
      'One surface treatment a month, 15% off everything deeper, and unused months roll for a ' +
      'quarter. Cancel in writing in any month - no window, no fee, no retention call.',
  },
  footnote:
    'Nothing is sold to you while you are lying on the table, and nothing is booked on the same ' +
    'day as a consult unless you ask us to.',
};

export const questions = {
  label: 'Questions',
  title: 'The five we get most',
  items: [
    {
      q: 'Will I look like I have had something done?',
      a:
        'That is a dosing decision, and it is yours. We start below the dose we think you need and ' +
        'bring you back at two weeks to add, because a neuromodulator cannot be taken back out. ' +
        'Clinicians here are measured on how many patients return, not on units sold.',
    },
    {
      q: 'How much downtime, really?',
      a:
        'Every treatment on this page carries its honest window rather than a best case. Surface ' +
        'work: none. Epidermal: three to four days of flaking. Dermal: two to five days of pink. ' +
        'Injectables: one to two days of swelling, sometimes a bruise. If a date matters, tell us ' +
        'and we will work backwards from it.',
    },
    {
      q: 'Who should not book?',
      a:
        'Pregnancy and nursing rule out most of the menu. So do active infection at the treatment ' +
        'site, isotretinoin within the last six months, and some autoimmune conditions and ' +
        'anticoagulants. Bring your medication list to the consult - about one consult in nine ends ' +
        'with us declining to treat.',
    },
    {
      q: 'Do you push series and memberships?',
      a:
        'We will tell you when a single session cannot do what you are asking, which is often true ' +
        'for texture and scarring. We will also drop a series at Week 4 if the photos are not ' +
        'moving. The membership exists because monthly surface care is genuinely cheaper that way, ' +
        'not to lock you in.',
    },
    {
      q: 'What if I do not like the result?',
      a:
        'Ask which column a treatment sits in before you agree to it. HA filler is dissolvable with ' +
        'hyaluronidase, usually within a week. Neuromodulators wear off at twelve to sixteen weeks. ' +
        'Biostimulators and energy devices are neither - they are lasting changes to your own ' +
        'collagen, and we say so out loud on Day 0.',
    },
  ],
};

export const book = {
  label: 'Book',
  title: 'Start with a consult',
  body:
    'Sixty minutes, $95, credited to your first treatment. You leave with a written plan whether ' +
    'or not you book anything else.',
  concernOptions: [
    'Fine lines',
    'Texture & pores',
    'Laxity',
    'Pigment & sun damage',
    'Acne or scarring',
    'Low energy / labs',
    'Not sure yet',
  ],
  timeOptions: ['Weekday morning', 'Weekday afternoon', 'Weekday evening', 'Saturday'],
};

export const footer = {
  disclaimer:
    'Inner Theory is a medical practice. Nothing on this page is medical advice, and no treatment ' +
    'is booked without an in-person consult and a medical history. The depths, downtime, and ' +
    'prices here describe typical cases; yours will differ. Individual results vary.',
};
