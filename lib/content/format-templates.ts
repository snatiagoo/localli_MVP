// Static, developer-authored composition-template images — one array of
// image paths per content format id (matching lib/db/seed.ts's format ids
// and the files in public/format-templates/). Almost every format has a
// single template image; carousel_ingredients_steps_photo has three, one
// per photo in that carousel. A format's array length is what tells the
// modal whether to show "next image" controls — no separate isCarousel
// flag needed, since images.length > 1 already means exactly that.
export const FORMAT_TEMPLATE_IMAGES: Record<string, string[]> = {
  signature_dish_spotlight_video: ["/format-templates/signature_dish_spotlight_video.png"],
  daily_special_photo: ["/format-templates/daily_special_photo.png"],
  behind_the_scenes_prep: ["/format-templates/behind_the_scenes_prep.png"],
  customer_reaction_nudge: ["/format-templates/customer_reaction_nudge.png"],
  specials_announcement_post: ["/format-templates/specials_announcement_post.png"],
  new_menu_item_teaser_video: ["/format-templates/new_menu_item_teaser_video.png"],
  plating_closeup_photo: ["/format-templates/plating_closeup_photo.png"],
  flat_lay_photo: ["/format-templates/flat_lay_photo.png"],
  reservation_ambience_photo: ["/format-templates/reservation_ambience_photo.png"],
  quick_recipe_tip_video: ["/format-templates/quick_recipe_tip_video.png"],
  walk_in_offer_photo: ["/format-templates/walk_in_offer_photo.png"],
  dish_process_video: ["/format-templates/dish_process_video.png"],
  chef_explains_dish_video: ["/format-templates/chef_explains_dish_video.png"],
  carousel_ingredients_steps_photo: [
    "/format-templates/carousel_ingredients_steps_photo_1.png",
    "/format-templates/carousel_ingredients_steps_photo_2.png",
    "/format-templates/carousel_ingredients_steps_photo_3.png",
  ],
  review_screenshot_photo: ["/format-templates/review_screenshot_photo.png"],
  direct_reservation_cta_photo: ["/format-templates/direct_reservation_cta_photo.png"],
};
