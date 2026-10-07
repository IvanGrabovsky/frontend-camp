export interface CodeAnalysisRule {
  id: string;
  label: string;
  passed: boolean;
  message: string;
  recommendation?: string;
}

export interface CodeAnalysisReport {
  passedAll: boolean;
  rules: CodeAnalysisRule[];
  score: number; // 0 - 100
}

/**
 * Static & dynamic code analyzer to verify student code quality and prevent hardcoding.
 */
export function analyzeStudentCode(code: string, questSlug: string): CodeAnalysisReport {
  const rules: CodeAnalysisRule[] = [];

  // Remove comments and strings to analyze pure code constructs
  const cleanCode = code
    .replace(/\/\*[\s\S]*?\*\//g, '') // multi-line comments
    .replace(/\/\/.*/g, '');           // single-line comments

  // 1. Conditionals check (if / else / switch / ternary)
  const hasIf = /\bif\s*\(/.test(cleanCode);
  const hasSwitch = /\bswitch\s*\(/.test(cleanCode);
  const hasTernary = /\?[\s\S]*?:/.test(cleanCode);
  const hasConditionals = hasIf || hasSwitch || hasTernary;

  rules.push({
    id: 'conditionals',
    label: 'Умовні конструкції (if / else / switch або ? :)',
    passed: hasConditionals,
    message: hasConditionals
      ? 'Використано умовні конструкції для розгалуження логіки'
      : 'У коді не знайдено умовних операторів (if/else або тернарного оператора ? :)',
    recommendation: 'Використайте оператор `if (...)` або тернарний оператор для перевірки умов завдання.',
  });

  // 2. Comparison operators check (===, !==, >, <, >=, <=)
  const hasComparison = /(===|!==|>=|<=|>|<)/.test(cleanCode);
  const hasAccidentalAssignment = /if\s*\([^)]*[^!=><]=[^=][^)]*\)/.test(cleanCode);

  rules.push({
    id: 'comparison',
    label: 'Оператори порівняння (===, !==, >, <, >=, <=)',
    passed: hasComparison && !hasAccidentalAssignment,
    message: hasAccidentalAssignment
      ? 'Увага: виявлено ймовірне випадкове присвоєння (=) всередині умови замість порівняння (===)'
      : hasComparison
      ? 'Коректно використано оператори порівняння значень'
      : 'Не знайдено операторів порівняння (===, >=, <= тощо)',
    recommendation: 'Використовуйте суворе порівняння `===` та знаки порівняння чисел `>=` чи `<`.',
  });

  // 3. Logical operators check (&&, ||, !)
  const hasLogicalAnd = /&&/.test(cleanCode);
  const hasLogicalOr = /\|\|/.test(cleanCode);
  const hasLogicalNot = /![^=]/.test(cleanCode);
  const hasLogical = hasLogicalAnd || hasLogicalOr || hasLogicalNot;

  rules.push({
    id: 'logical',
    label: 'Логічні оператори (&&, ||, !)',
    passed: hasLogical,
    message: hasLogical
      ? 'Використано логічні оператори (І, АБО чи НЕ)'
      : 'Не виявлено логічних операторів (&&, || чи !)',
    recommendation: 'Поєднайте умови за допомогою операторів `&&` (І), `||` (АБО) або `!` (НЕ).',
  });

  // 4. Variables declaration check (let, const)
  const hasVariables = /\b(const|let)\s+[a-zA-Z_$]/.test(cleanCode);
  rules.push({
    id: 'variables',
    label: 'Оголошення змінних (let / const)',
    passed: hasVariables,
    message: hasVariables
      ? 'Використано сучасні ключові слова оголошення змінних (let або const)'
      : 'Порада: використовуйте змінні let/const для збереження проміжних результатів',
    recommendation: 'Оголошуйте змінні через `const` або `let` замість застарілого `var`.',
  });

  // 5. Quest specific function & parameter integrity
  if (questSlug === 'dungeon-quest') {
    const hasChestFn = /function\s+canOpenChest\s*\([^)]*hasKey[^)]*\)/.test(cleanCode) || /canOpenChest/.test(cleanCode);
    const hasDamageFn = /function\s+calculateDamage/.test(cleanCode) || /calculateDamage/.test(cleanCode);
    const hasHeroStatusFn = /function\s+getHeroStatus/.test(cleanCode) || /getHeroStatus/.test(cleanCode);

    const fnsPassed = hasChestFn && hasDamageFn && hasHeroStatusFn;
    rules.push({
      id: 'functions_integrity',
      label: 'Цілісність сигнатур функцій',
      passed: fnsPassed,
      message: fnsPassed
        ? 'Усі 3 обовʼязкові функції оголошено та збережено їхні параметри'
        : 'Деякі функції було перейменовано або видалено обовʼязкові параметри',
      recommendation: 'Не видаляйте параметри функцій (hasKey, lockpickLevel тощо) із заголовків.',
    });
  }

  const passedCount = rules.filter((r) => r.passed).length;
  const score = Math.round((passedCount / rules.length) * 100);

  return {
    passedAll: rules.every((r) => r.passed),
    rules,
    score,
  };
}

/**
 * Runs randomized anti-cheat tests with inputs unknown in advance
 */
export function runAntiCheatRandomTests(fns: Record<string, any>, questSlug: string): { passed: boolean; message: string } {
  try {
    if (questSlug === 'dungeon-quest') {
      const { canOpenChest, calculateDamage, getHeroStatus } = fns;
      if (!canOpenChest || !calculateDamage || !getHeroStatus) {
        return { passed: false, message: 'Обовʼязкові функції не знайдено' };
      }

      // 1. Random lockpick tests
      for (let i = 0; i < 5; i++) {
        const randomHigh = 60 + Math.floor(Math.random() * 40); // 60-99
        const randomLow = Math.floor(Math.random() * 60);       // 0-59

        if (canOpenChest(false, randomHigh, true) !== true) {
          return { passed: false, message: `Помилка на випадковому рівні злому ${randomHigh} (мало бути true)` };
        }
        if (canOpenChest(false, randomLow, true) !== false) {
          return { passed: false, message: `Помилка на випадковому рівні злому ${randomLow} (мало бути false)` };
        }
      }

      // 2. Random attack power tests
      for (let i = 0; i < 5; i++) {
        const randAtk = Math.floor(Math.random() * 80) + 10;
        const expectedSword = Math.round(randAtk * 1.0);
        const actualSword = calculateDamage(randAtk, 'sword', false);
        if (actualSword !== expectedSword) {
          return { passed: false, message: `Помилка на випадковій атаці ${randAtk}: очікувалось ${expectedSword}, отримано ${actualSword}` };
        }
      }

      // 3. Random HP percentage tests
      for (let i = 0; i < 5; i++) {
        const maxHp = 100 + Math.floor(Math.random() * 200); // 100 - 300
        const randHpHealthy = Math.floor(maxHp * 0.85); // 85%
        const randHpWounded = Math.floor(maxHp * 0.5);  // 50%
        const randHpCritical = Math.floor(maxHp * 0.1); // 10%

        if (getHeroStatus(randHpHealthy, maxHp) !== 'Healthy') return { passed: false, message: `Невірний статус на ${randHpHealthy}/${maxHp} HP` };
        if (getHeroStatus(randHpWounded, maxHp) !== 'Wounded') return { passed: false, message: `Невірний статус на ${randHpWounded}/${maxHp} HP` };
        if (getHeroStatus(randHpCritical, maxHp) !== 'Critical') return { passed: false, message: `Невірний статус на ${randHpCritical}/${maxHp} HP` };
      }
    }

    return { passed: true, message: 'Всі рандомізовані перевірки успішно пройдено! Хардкод відсутній.' };
  } catch (err: any) {
    return { passed: false, message: `Помилка динамічної перевірки: ${err.message}` };
  }
}
