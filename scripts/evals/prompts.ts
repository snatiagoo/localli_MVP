



export const system = `You generate realistic test data for an app that helps small, independent restaurant owners in Spanish-speaking countries plan social media content. The app takes a restaurant's profile and generates a filming brief (shot list, editing notes, caption) in Spanish. Your test profiles will be used to evaluate how well those briefs turn out, so they must look like profiles real owners would type into an onboarding form: plausible, specific, and written in Spanish (restaurant names, dish names, specials). Do not invent famous chains or real existing restaurants.`;


export const userMessage = `Generate exactly 20 restaurant profiles.

Field meanings:
- name: the restaurant's name as the owner would write it.
- category: always "restaurant".
- goal: what the owner most wants more of from social media.
- cuisine: short free text, as an owner would type it (e.g. "mexicana", "tapas y raciones", "sushi y ramen", "cafetería y brunch").
- signatureDishes: the dishes they're known for, by the name used on their menu.
- specials: current offers or recurring specials. label is short (e.g. "Menú del día", "2x1 en tacos los martes"); description is optional extra detail.

Variety requirements:
- Goals: exactly 4 profiles per goal (more_walk_ins, more_takeout_orders, more_reservations, more_brand_awareness, promote_new_menu_items).
- Cuisines: at least 12 different cuisines across the 20, mixing local Spanish/Latin American food with international food run by local owners.
- Size and price: mix tiny casual places (food stall, bar, family taquería, café) with mid-range and a few upscale restaurants.
- Location: mix restaurants from Spain and several Latin American countries, with naming and dish vocabulary that fit each place.
- Make each profile's goal believable for that kind of restaurant (e.g. a delivery-heavy pizzeria wanting takeout orders).

Edge cases (the app must handle sparse or messy input, so include these):
- 3 profiles with an empty specials list.
- 2 profiles with only 1 signature dish; most others have 2–5.
- 1 profile with 8 or more signature dishes.
- At least 4 specials across all profiles with no description.
- 2 profiles with long or unusual dish names (regional names, names with ingredients listed).
- 1 profile whose goal is promote_new_menu_items where the new dish appears in specials, not in signatureDishes.`;