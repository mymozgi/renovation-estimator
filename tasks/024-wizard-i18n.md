# WIZARD I18N

Goal:

Translate the full room configuration wizard (RoomWizard.tsx) to all 5 languages. Currently the wizard renders in English regardless of locale.

Business logic:

Ukrainian and Russian-speaking users in Poland are a major part of the target audience. If the wizard (where they spend 8 of 10 minutes) is in English, they cannot use the product. Direct conversion loss.

---

## Activities

* replace all hardcoded English strings in `RoomWizard.tsx` with `useTranslations('wizard')`
* translation keys already exist in all 5 `messages/*.json` files under `wizard.*`
* update step labels: "STEP {step} OF {total}" → `t('wizard.step', { step, total })`
* update room type grid labels → `t('wizard.roomTypes.kitchen')` etc.
* update dimension labels: Width / Length / Height → `t('wizard.width')` etc.
* update condition items in steps 3/4:
  * wall conditions → `t('wizard.wallConditions.ready')` + `t('wizard.wallConditions.ready_desc')` etc.
  * floor conditions → `t('wizard.floorConditions.*')`
  * ceiling conditions → `t('wizard.ceilingConditions.*')`
* update finisher labels:
  * quality tiers → `t('wizard.qualityTiers.*')`
  * wall/floor/ceiling finishes → `t('wizard.wallFinishes.*')` etc.
* update CTA buttons: Continue / Save room → `t('wizard.continue')` / `t('wizard.saveRoom')`
* update confirmation step summary labels → `t('wizard.roomType')` etc.
* update RoomCard component — room type labels and quality tier badge use labels.ts (English) — switch to translations
* test all 5 locales end-to-end through the full wizard

---

Output:

RoomWizard fully translated, RoomCard labels translated, all 5 locales display correctly

Validation:

full wizard flow works in Polish, English, Ukrainian, Russian, Belarusian — all labels, conditions, and finishes display in the correct language
