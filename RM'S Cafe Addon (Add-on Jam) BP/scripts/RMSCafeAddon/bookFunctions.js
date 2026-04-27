var NameSpaces = "RMCafeAddon101";
var NamingBtch = "RMCafeAddon101";

import * as mc from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';
import { rmCafeAddonInformation } from './addonInformation';

mc.world.beforeEvents.itemUse.subscribe((event) => {
    const item = event.itemStack;
    const player = event.source;
    if (item.typeId == "rm_cafe:rmcafe_addon_book"){
        mc.system.run(() => {
            rmCafeAddonInformation(player)
        })
    }
});

const DEBUGASSHOLE = false;

export function givePlayerBook(player){
    player.runCommand(`execute as @s[tag=!${NameSpaces.substring(0,NamingBtch.length -1)}] at @s run give @s rm_cafe:rmcafe_addon_book`);
    player.runCommand(`tag @s[tag=!${NameSpaces.substring(0,NamingBtch.length -1)}] add ${NameSpaces.substring(0,NamingBtch.length -1)}`);
    if (DEBUGASSHOLE){
        btch.world.sendMessage(`Given Player Book`);
    }
};