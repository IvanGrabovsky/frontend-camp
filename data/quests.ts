export interface QuestTask {
  id: string;
  name: string;
  functionName: string;
  description: string;
  rules: string[];
  example: string;
}

export interface QuestTestCase {
  id: string;
  title: string;
  run: (functions: Record<string, any>) => { passed: boolean; actual: any; expected: any; error?: string };
}

export interface Quest {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  theme: 'rpg' | 'cyberpunk' | 'space';
  crystalsReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  story: string;
  starterCode: string;
  solutionCode: string;
  tasks: QuestTask[];
  testCases: QuestTestCase[];
}

export const QUESTS: Quest[] = [
  {
    slug: 'dungeon-quest',
    title: 'Dungeon Loot Quest',
    subtitle: 'Бойовий рушій міні-RPG: Скрині, Шкода та Здоровʼя',
    badge: '⚔️ Текстова RPG',
    theme: 'rpg',
    difficulty: 'easy',
    crystalsReward: 150,
    story: `Ти опиняєшся біля входу до підземелля Забутого Дракона. Навколо — скрині з отруйними пастками, зброя та монстри. 
Твоя мета — написати безпечну логіку бойового рушія, щоб персонаж міг відмикати скрині, розраховувати бойову шкоду та контролювати рівень здоров'я.`,
    starterCode: `/**
 * ⚔️ Dungeon Loot Quest: Меч, Магія та Скрині
 */

// Завдання 1: Відкриття скрині
export function canOpenChest(hasKey, lockpickLevel, isTrapDisarmed) {
  // TODO: Поверніть true або false
  return false;
}

// Завдання 2: Розрахунок бойової шкоди
export function calculateDamage(attackPower, weaponClass, isCrit) {
  // TODO: Поверніть розраховану шкоду (Math.round)
  return 0;
}

// Завдання 3: Стан здоров'я героя
export function getHeroStatus(currentHp, maxHp) {
  // TODO: Поверніть 'Defeated' | 'Critical' | 'Wounded' | 'Healthy'
  return 'Healthy';
}
`,
    solutionCode: `export function canOpenChest(hasKey, lockpickLevel, isTrapDisarmed) {
  if (!isTrapDisarmed) return false;
  return Boolean(hasKey || lockpickLevel >= 60);
}

export function calculateDamage(attackPower, weaponClass, isCrit) {
  let multiplier = 0.5;
  if (weaponClass === 'sword') multiplier = 1.0;
  else if (weaponClass === 'bow') multiplier = 1.2;
  else if (weaponClass === 'staff') multiplier = 1.5;

  let damage = attackPower * multiplier;
  if (isCrit) damage *= 2;
  return Math.round(damage);
}

export function getHeroStatus(currentHp, maxHp) {
  if (maxHp <= 0 || currentHp <= 0) return 'Defeated';
  const percent = (currentHp / maxHp) * 100;
  if (percent < 25) return 'Critical';
  if (percent <= 75) return 'Wounded';
  return 'Healthy';
}
`,
    tasks: [
      {
        id: 'chest',
        name: '1. Відкриття скрині',
        functionName: 'canOpenChest(hasKey, lockpickLevel, isTrapDisarmed)',
        description: 'Безпечне відкриття скрині з урахуванням смертельної пастки.',
        rules: [
          'Якщо пастка НЕ знешкоджена (!isTrapDisarmed) -> ЗАВЖДИ повертає false.',
          'Якщо пастка знешкоджена: відкривається, якщо є ключ (hasKey === true) АБО рівень злому lockpickLevel >= 60.',
          'В інших випадках повертає false.'
        ],
        example: 'canOpenChest(true, 10, true) // true\ncanOpenChest(true, 100, false) // false'
      },
      {
        id: 'damage',
        name: '2. Розрахунок шкоди',
        functionName: 'calculateDamage(attackPower, weaponClass, isCrit)',
        description: 'Розрахунок атаки з множниками зброї та критичним ударом.',
        rules: [
          "Множники зброї: 'sword' -> 1.0; 'bow' -> 1.2; 'staff' -> 1.5; інша -> 0.5",
          'Якщо isCrit === true -> шкода подвоюється (* 2)',
          'Результат поверніть цілим числом через Math.round()'
        ],
        example: "calculateDamage(50, 'sword', false) // 50\ncalculateDamage(40, 'staff', true) // 120"
      },
      {
        id: 'hp',
        name: "3. Стан здоров'я",
        functionName: 'getHeroStatus(currentHp, maxHp)',
        description: 'Категоризація стану персонажа на основі відсотка HP.',
        rules: [
          "Якщо maxHp <= 0 або currentHp <= 0 -> повертає 'Defeated'",
          "Розрахуйте відсоток: (currentHp / maxHp) * 100",
          "менше 25% -> 'Critical'",
          "від 25% до 75% включно -> 'Wounded'",
          "більше 75% -> 'Healthy'"
        ],
        example: 'getHeroStatus(20, 100) // "Critical"\ngetHeroStatus(80, 100) // "Healthy"'
      }
    ],
    testCases: [
      {
        id: 'dq-1',
        title: 'canOpenChest: блокує, якщо пастка активна (!isTrapDisarmed)',
        run: ({ canOpenChest }) => {
          const res = canOpenChest(true, 100, false);
          return { passed: res === false, actual: res, expected: false };
        }
      },
      {
        id: 'dq-2',
        title: 'canOpenChest: відкриває знешкоджену скриню ключем',
        run: ({ canOpenChest }) => {
          const res = canOpenChest(true, 10, true);
          return { passed: res === true, actual: res, expected: true };
        }
      },
      {
        id: 'dq-3',
        title: 'canOpenChest: відкриває знешкоджену скриню відмичкою (level >= 60)',
        run: ({ canOpenChest }) => {
          const res = canOpenChest(false, 60, true);
          return { passed: res === true, actual: res, expected: true };
        }
      },
      {
        id: 'dq-4',
        title: 'canOpenChest: забороняє відкриття без ключа та з рівнем < 60',
        run: ({ canOpenChest }) => {
          const res = canOpenChest(false, 59, true);
          return { passed: res === false, actual: res, expected: false };
        }
      },
      {
        id: 'dq-5',
        title: 'calculateDamage: атака мечем (attack * 1.0)',
        run: ({ calculateDamage }) => {
          const res = calculateDamage(50, 'sword', false);
          return { passed: res === 50, actual: res, expected: 50 };
        }
      },
      {
        id: 'dq-6',
        title: 'calculateDamage: атака луком (attack * 1.2)',
        run: ({ calculateDamage }) => {
          const res = calculateDamage(50, 'bow', false);
          return { passed: res === 60, actual: res, expected: 60 };
        }
      },
      {
        id: 'dq-7',
        title: 'calculateDamage: атака посохом мага (attack * 1.5)',
        run: ({ calculateDamage }) => {
          const res = calculateDamage(40, 'staff', false);
          return { passed: res === 60, actual: res, expected: 60 };
        }
      },
      {
        id: 'dq-8',
        title: 'calculateDamage: атака іншою зброєю/кулаками (attack * 0.5)',
        run: ({ calculateDamage }) => {
          const res = calculateDamage(30, 'fist', false);
          return { passed: res === 15, actual: res, expected: 15 };
        }
      },
      {
        id: 'dq-9',
        title: 'calculateDamage: подвоєння при критичному ударі (* 2)',
        run: ({ calculateDamage }) => {
          const res = calculateDamage(50, 'sword', true);
          return { passed: res === 100, actual: res, expected: 100 };
        }
      },
      {
        id: 'dq-10',
        title: 'getHeroStatus: повертає "Defeated" при HP <= 0',
        run: ({ getHeroStatus }) => {
          const res = getHeroStatus(0, 100);
          return { passed: res === 'Defeated', actual: res, expected: 'Defeated' };
        }
      },
      {
        id: 'dq-11',
        title: 'getHeroStatus: повертає "Critical" при HP < 25%',
        run: ({ getHeroStatus }) => {
          const res = getHeroStatus(24, 100);
          return { passed: res === 'Critical', actual: res, expected: 'Critical' };
        }
      },
      {
        id: 'dq-12',
        title: 'getHeroStatus: повертає "Wounded" при 25% - 75% HP',
        run: ({ getHeroStatus }) => {
          const res = getHeroStatus(50, 100);
          return { passed: res === 'Wounded', actual: res, expected: 'Wounded' };
        }
      },
      {
        id: 'dq-13',
        title: 'getHeroStatus: повертає "Healthy" при HP > 75%',
        run: ({ getHeroStatus }) => {
          const res = getHeroStatus(80, 100);
          return { passed: res === 'Healthy', actual: res, expected: 'Healthy' };
        }
      }
    ]
  },
  {
    slug: 'cyber-bouncer',
    title: 'Cyber Bouncer AI',
    subtitle: 'Штучний інтелект нічного клубу Нео-Києва 2077',
    badge: '🕶️ Cyberpunk 2077',
    theme: 'cyberpunk',
    difficulty: 'medium',
    crystalsReward: 160,
    story: `Рік 2077. Нео-Київ. Ти програмуєш дрона-фейсконтроль найпопулярнішого кібер-клубу «Neon Pulse».
Твоє завдання: перевіряти вік і статус гостей, розраховувати знижки на квитки та розподіляти відвідувачів за зонами доступу.`,
    starterCode: `/**
 * 🕶️ Cyberpunk Bouncer AI (Нео-Київ 2077)
 */

// Завдання 1: Перевірка пропуску
export function canEnter(age, hasTicket, isVip, isBanned) {
  // TODO: Поверніть true або false
  return false;
}

// Завдання 2: Розрахунок вартості квитка
export function calculateTicketPrice(basePrice, isStudent, isVip, promoCode) {
  // TODO: Поверніть вартість
  return 0;
}

// Завдання 3: Зона доступу
export function getAccessZone(balance) {
  // TODO: Поверніть 'Denied' | 'Street' | 'Standard' | 'VIP Lounge' | 'Cyber Penthouse'
  return '';
}
`,
    solutionCode: `export function canEnter(age, hasTicket, isVip, isBanned) {
  if (isBanned) return false;
  if (age < 18) return false;
  return Boolean(hasTicket || isVip);
}

export function calculateTicketPrice(basePrice, isStudent, isVip, promoCode) {
  if (isVip) return 0;
  if (promoCode === 'NEON2077') return basePrice * 0.5;
  if (isStudent) return basePrice * 0.7;
  return basePrice;
}

export function getAccessZone(balance) {
  if (typeof balance !== 'number' || balance < 0) return 'Denied';
  if (balance < 100) return 'Street';
  if (balance < 500) return 'Standard';
  if (balance < 2000) return 'VIP Lounge';
  return 'Cyber Penthouse';
}
`,
    tasks: [
      {
        id: 'enter',
        name: '1. Перевірка пропуску',
        functionName: 'canEnter(age, hasTicket, isVip, isBanned)',
        description: 'Правила пропуску відвідувачів до клубу.',
        rules: [
          'Якщо гість у чорному списку (isBanned === true) -> ЗАВЖДИ false.',
          'Відвідувачу має бути щонайменше 18 років (age >= 18).',
          'Якщо гість повнолітній і не в бані: прохід дозволено, якщо є квиток АБО він VIP.'
        ],
        example: 'canEnter(20, true, false, false) // true\ncanEnter(22, true, false, true) // false'
      },
      {
        id: 'price',
        name: '2. Ціна квитка',
        functionName: 'calculateTicketPrice(basePrice, isStudent, isVip, promoCode)',
        description: 'Розрахунок знижок із пріоритетом.',
        rules: [
          'VIP (isVip === true) -> безкоштовно (0).',
          "Промокод 'NEON2077' -> знижка 50% від basePrice.",
          'Студент (isStudent === true) -> знижка 30% від basePrice.',
          'Пріоритет: VIP > Промокод > Студент. Знижки не сумуються.'
        ],
        example: "calculateTicketPrice(400, false, false, 'NEON2077') // 200\ncalculateTicketPrice(400, true, false, null) // 280"
      },
      {
        id: 'zone',
        name: '3. Зона доступу',
        functionName: 'getAccessZone(balance)',
        description: 'Визначення зони доступу за балансом чипа.',
        rules: [
          "Якщо balance не число або менше 0 -> 'Denied'",
          "< 100 -> 'Street'",
          "від 100 до 499 -> 'Standard'",
          "від 500 до 1999 -> 'VIP Lounge'",
          "2000 і більше -> 'Cyber Penthouse'"
        ],
        example: "getAccessZone(350) // 'Standard'\ngetAccessZone(1500) // 'VIP Lounge'"
      }
    ],
    testCases: [
      {
        id: 'cb-1',
        title: 'canEnter: блокує забаненого користувача (isBanned === true)',
        run: ({ canEnter }) => {
          const res = canEnter(21, true, false, true);
          return { passed: res === false, actual: res, expected: false };
        }
      },
      {
        id: 'cb-2',
        title: 'canEnter: блокує неповнолітніх (< 18)',
        run: ({ canEnter }) => {
          const res = canEnter(17, true, false, false);
          return { passed: res === false, actual: res, expected: false };
        }
      },
      {
        id: 'cb-3',
        title: 'canEnter: пропускає повнолітнього з квитком',
        run: ({ canEnter }) => {
          const res = canEnter(18, true, false, false);
          return { passed: res === true, actual: res, expected: true };
        }
      },
      {
        id: 'cb-4',
        title: 'canEnter: пропускає повнолітнього VIP без квитка',
        run: ({ canEnter }) => {
          const res = canEnter(20, false, true, false);
          return { passed: res === true, actual: res, expected: true };
        }
      },
      {
        id: 'cb-5',
        title: 'calculateTicketPrice: для VIP вартість 0',
        run: ({ calculateTicketPrice }) => {
          const res = calculateTicketPrice(500, false, true, null);
          return { passed: res === 0, actual: res, expected: 0 };
        }
      },
      {
        id: 'cb-6',
        title: 'calculateTicketPrice: промокод NEON2077 дає 50% знижки',
        run: ({ calculateTicketPrice }) => {
          const res = calculateTicketPrice(400, false, false, 'NEON2077');
          return { passed: res === 200, actual: res, expected: 200 };
        }
      },
      {
        id: 'cb-7',
        title: 'calculateTicketPrice: студент отримує 30% знижки',
        run: ({ calculateTicketPrice }) => {
          const res = calculateTicketPrice(400, true, false, null);
          return { passed: res === 280, actual: res, expected: 280 };
        }
      },
      {
        id: 'cb-8',
        title: 'getAccessZone: повертає "Denied" для некоректних значень',
        run: ({ getAccessZone }) => {
          const res = getAccessZone(-10);
          return { passed: res === 'Denied', actual: res, expected: 'Denied' };
        }
      },
      {
        id: 'cb-9',
        title: 'getAccessZone: повертає "Street" для балансу < 100',
        run: ({ getAccessZone }) => {
          const res = getAccessZone(50);
          return { passed: res === 'Street', actual: res, expected: 'Street' };
        }
      },
      {
        id: 'cb-10',
        title: 'getAccessZone: повертає "VIP Lounge" для балансу від 500 до 1999',
        run: ({ getAccessZone }) => {
          const res = getAccessZone(1000);
          return { passed: res === 'VIP Lounge', actual: res, expected: 'VIP Lounge' };
        }
      },
      {
        id: 'cb-11',
        title: 'getAccessZone: повертає "Cyber Penthouse" для 2000+',
        run: ({ getAccessZone }) => {
          const res = getAccessZone(2500);
          return { passed: res === 'Cyber Penthouse', actual: res, expected: 'Cyber Penthouse' };
        }
      }
    ]
  },
  {
    slug: 'space-rover',
    title: 'Mission Mars Ares-7',
    subtitle: 'Бортовий компʼютер марсохода: Радіація та Паливо',
    badge: '🪐 Sci-Fi Космос',
    theme: 'space',
    difficulty: 'medium',
    crystalsReward: 170,
    story: `Червона планета. Автономний всюдихід Ares-7 потрапив у сонячну бурю.
Твоя місія: відновити роботу навігаційного комп'ютера, розрахувати витрати палива та оцінити радіаційну небезпеку для екіпажу.`,
    starterCode: `/**
 * 🚀 Mars Rover Ares-7: Бортовий комп'ютер
 */

// Завдання 1: Радіаційна безпека
export function checkRadiationSafety(radiationLevel, isShieldActive) {
  // TODO: Поверніть 'SAFE' | 'WARNING' | 'DANGER'
  return 'SAFE';
}

// Завдання 2: Дозвіл на виїзд
export function canStartExpedition(batteryLevel, weather, oxygenTanks) {
  // TODO: Поверніть true або false
  return false;
}

// Завдання 3: Розрахунок палива
export function calculateTripFuel(distanceKm, fuelPerKm, terrainType) {
  // TODO: Поверніть число, округлене до 1 знака
  return 0;
}
`,
    solutionCode: `export function checkRadiationSafety(radiationLevel, isShieldActive) {
  if (radiationLevel < 50) return 'SAFE';
  if (isShieldActive) return 'WARNING';
  return 'DANGER';
}

export function canStartExpedition(batteryLevel, weather, oxygenTanks) {
  return batteryLevel >= 60 && (weather === 'clear' || weather === 'cloudy') && oxygenTanks >= 2;
}

export function calculateTripFuel(distanceKm, fuelPerKm, terrainType) {
  if (distanceKm <= 0 || fuelPerKm <= 0) return 0;
  let multiplier = 1.0;
  if (terrainType === 'rocky') multiplier = 1.3;
  else if (terrainType === 'sand_dunes') multiplier = 1.8;
  const fuel = distanceKm * fuelPerKm * multiplier;
  return Math.round(fuel * 10) / 10;
}
`,
    tasks: [
      {
        id: 'rad',
        name: '1. Радіаційна безпека',
        functionName: 'checkRadiationSafety(radiationLevel, isShieldActive)',
        description: 'Оцінка рівня загрози для електроніки.',
        rules: [
          "< 50 мкЗв/год -> 'SAFE'",
          ">= 50 і щит увімкнено (isShieldActive === true) -> 'WARNING'",
          ">= 50 і щит вимкнено -> 'DANGER'"
        ],
        example: "checkRadiationSafety(40, false) // 'SAFE'\ncheckRadiationSafety(60, true) // 'WARNING'"
      },
      {
        id: 'exp',
        name: '2. Вихід в експедицію',
        functionName: 'canStartExpedition(batteryLevel, weather, oxygenTanks)',
        description: 'Перевірка всіх трьох умов готовності марсохода.',
        rules: [
          'Батарея не менше 60% (batteryLevel >= 60)',
          "Погода 'clear' або 'cloudy' (якщо 'storm' — заборонено)",
          'Кількість балонів з киснем не менше 2 (oxygenTanks >= 2)'
        ],
        example: "canStartExpedition(80, 'clear', 3) // true\ncanStartExpedition(90, 'storm', 5) // false"
      },
      {
        id: 'fuel',
        name: '3. Розрахунок палива',
        functionName: 'calculateTripFuel(distanceKm, fuelPerKm, terrainType)',
        description: 'Витрати палива з урахуванням рельєфу Марса.',
        rules: [
          'Якщо distanceKm <= 0 або fuelPerKm <= 0 -> 0',
          "Множники: 'rocky' -> 1.3, 'sand_dunes' -> 1.8, інше -> 1.0",
          'Округлення до 1 знака після коми: Math.round(fuel * 10) / 10'
        ],
        example: "calculateTripFuel(10, 2, 'rocky') // 26\ncalculateTripFuel(7, 1.5, 'rocky') // 13.7"
      }
    ],
    testCases: [
      {
        id: 'sr-1',
        title: 'checkRadiationSafety: повертає "SAFE" при радіації < 50',
        run: ({ checkRadiationSafety }) => {
          const res = checkRadiationSafety(35, false);
          return { passed: res === 'SAFE', actual: res, expected: 'SAFE' };
        }
      },
      {
        id: 'sr-2',
        title: 'checkRadiationSafety: повертає "WARNING" при радіації >= 50 з активним щитом',
        run: ({ checkRadiationSafety }) => {
          const res = checkRadiationSafety(60, true);
          return { passed: res === 'WARNING', actual: res, expected: 'WARNING' };
        }
      },
      {
        id: 'sr-3',
        title: 'checkRadiationSafety: повертає "DANGER" при радіації >= 50 без щита',
        run: ({ checkRadiationSafety }) => {
          const res = checkRadiationSafety(60, false);
          return { passed: res === 'DANGER', actual: res, expected: 'DANGER' };
        }
      },
      {
        id: 'sr-4',
        title: 'canStartExpedition: дозволяє виїзд за сприятливих умов',
        run: ({ canStartExpedition }) => {
          const res = canStartExpedition(80, 'clear', 3);
          return { passed: res === true, actual: res, expected: true };
        }
      },
      {
        id: 'sr-5',
        title: 'canStartExpedition: забороняє виїзд при низькому заряді (< 60)',
        run: ({ canStartExpedition }) => {
          const res = canStartExpedition(50, 'clear', 3);
          return { passed: res === false, actual: res, expected: false };
        }
      },
      {
        id: 'sr-6',
        title: 'canStartExpedition: забороняє виїзд під час бурі ("storm")',
        run: ({ canStartExpedition }) => {
          const res = canStartExpedition(90, 'storm', 4);
          return { passed: res === false, actual: res, expected: false };
        }
      },
      {
        id: 'sr-7',
        title: 'calculateTripFuel: базова витрата для рівнини',
        run: ({ calculateTripFuel }) => {
          const res = calculateTripFuel(10, 2, 'flat');
          return { passed: res === 20, actual: res, expected: 20 };
        }
      },
      {
        id: 'sr-8',
        title: 'calculateTripFuel: множник 1.3 для скель ("rocky")',
        run: ({ calculateTripFuel }) => {
          const res = calculateTripFuel(10, 2, 'rocky');
          return { passed: res === 26, actual: res, expected: 26 };
        }
      },
      {
        id: 'sr-9',
        title: 'calculateTripFuel: множник 1.8 для піщаних дюн ("sand_dunes")',
        run: ({ calculateTripFuel }) => {
          const res = calculateTripFuel(15, 3, 'sand_dunes');
          return { passed: res === 81, actual: res, expected: 81 };
        }
      },
      {
        id: 'sr-10',
        title: 'calculateTripFuel: округлення до одного десяткового знака',
        run: ({ calculateTripFuel }) => {
          const res = calculateTripFuel(7, 1.5, 'rocky');
          return { passed: res === 13.7, actual: res, expected: 13.7 };
        }
      }
    ]
  }
];
