import { DEBUGASSHOLE } from "./main";
import { ActionFormData } from "@minecraft/server-ui";

export function rmCafeAddonInformation(player) {
  const GettingStarted = new ActionFormData();
  GettingStarted.title("Welcome");

  GettingStarted.body(
    "Hi there and thank you to download this addon and I hope you enjoy \nPlease Rate Me a 5-star to support of the development. \nFollow me on social media accounts below:\n\n===============================\nTwitter/X: @rmplaysmc_yt \nYT: Ronnel Mitra \nMCPEDL: RMPlaysMC YT \nCurseforge: RMPlaysMC YT\n===============================\n"
  );

  GettingStarted.button("Getting Started");
  GettingStarted.button("Food and Drinks");
  GettingStarted.button("About");

  GettingStarted.show(player).then((r) => {
    if (r.canceled) return;
    switch (r.selection) {
      case 0:
        _Page1GettingStarted(player);
        break;
      case 1:
        _Page2Food_and_Drinks(player);
        break;
      case 2:
        _AboutTheAddOn(player);
        break;
      case 3:
        break;
    }
  });
}

function _Page1GettingStarted(player) {
  const Page1GettingStarted = new ActionFormData();
  Page1GettingStarted.title("Getting Started");
  Page1GettingStarted.body(
    "Hello and welcome to RM's Cafe Add-on!\n\nThis add-on was made by Ronnel Mitra (RMPlaysMC)\n\nIf you have any questions or suggestions, please let me know!\n\nDiscord: RonnelMitra#9360\n\n Features:\n - Add 10 Sets of Cafe you will like\n - A vending machine, best for survival gameplay with friends or build a cafe with this add-on\n - Cooking Machine, great for cooking food especially deserts and treats"
  );
  Page1GettingStarted.button("Go Back");
  Page1GettingStarted.show(player).then((r) => {
    if (r.canceled) return;
    switch (r.selection) {
      case 0:
        _Page1GettingStarted(player);
        break;
      case 1:
        break;
    }
  });
};

function _Page2Food_and_Drinks(player){
  const Page2Food_and_Drinks = new ActionFormData();
  Page2Food_and_Drinks.title("Food and Drinks");
  Page2Food_and_Drinks.body(
    "Hello and welcome to RM's Cafe Add-on!\n\nThis add-on was made by Ronnel Mitra (RMPlaysMC)\n\nIf you have any questions or suggestions, please let me know!\n\nDiscord: RonnelMitra#9360\n\n Features:\n - Add 10 Sets of Cafe you will like\n - A vending machine, best for survival gameplay with friends or build a cafe with this add-on\n - Cooking Machine, great for cooking food especially deserts and treats"
  );
  Page2Food_and_Drinks.button("Go Back");
  Page2Food_and_Drinks.show(player).then((r) => {
    if (r.canceled) return;
    switch (r.selection) {
      case 0:
        _Page1GettingStarted(player);
        break;
      case 1:
        break;
    }
  });
};

function _AboutTheAddOn(player){
  const _AboutTheAddOn = new ActionFormData();
  _AboutTheAddOn.title("About The Add-on");
  _AboutTheAddOn.body(
    "RM's Cafe Add-On\nCreated by RMPlaysMC Studios by RMPlaysMCYT\This is a community build which the repository is open at https://github.com/RMPlaysMCYT/RM-s-Cafe-Add-on"
  );
  _AboutTheAddOn.button("Go Back");
  _AboutTheAddOn.show(player).then((r) => {
    if (r.canceled) return;
    switch (r.selection) {
      case 0:
        _Page1GettingStarted(player);
        break;
      case 1:
        break;
    }
  });
};