////EVERYTHING HERE IS OPEN-SOURCE SO, YOU CAN LEARN IT HERE AND ENJOY
////FEEL FREE TO CREDIT ME AND GRAB THE LICENSE FROM LICENSE.txt
////THIS ADD-ON IS UNDER MIT LICENSE

////THE CODES MAY CONTAIN PROFANITY BUT PLEASE UNDERSTAND IT, BUT IF YOUR A KID WHO WANT TO READ THE CODES, BE WARNED

////Coffee Vending System
import {
    world,
    system
} from '@minecraft/server';

import {
    ActionFormData
} from '@minecraft/server-ui';


/////MAIN CUSTOM COMPONENT LIBRARY/////
world.beforeEvents.worldInitialize.subscribe((event) => {

    ////THIS IS FOR CUSTOM BLOCKS SECTION
    ////THIS IS FOR CUSTOM BLOCKS SECTION
    ////THIS IS FOR CUSTOM BLOCKS SECTION
    event.blockComponentRegistry.registerCustomComponent("rm_cafe:coffee_vending_machine_component", new RMCAFECoffeeVendingMachine());
    event.blockComponentRegistry.registerCustomComponent("rm_cafe:coffee_machine_component", new RMCAFECoffeeMachine());
    event.blockComponentRegistry.registerCustomComponent("rm_cafe:frame_connections", new RMCafeFrameConnections());


    ////THIS IS FOR CUSTOM ITEMS SECTION
    ////THIS IS FOR CUSTOM ITEMS SECTION
    ////THIS IS FOR CUSTOM ITEMS SECTION
    ////THIS IS FOR CUSTOM ITEMS SECTION
    event.itemComponentRegistry.registerCustomComponent("rm_cafe:always_alert", new SetInPutaMode);
})
/////MAIN CUSTOM COMPONENT LIBRARY/////



/////FUNCTIONS AND SYSTEMS/////



class RMCAFECoffeeMachine {
    onPlayerInteract(event) {
        const { player, block, dimension } = event;
        const coffeeVendingUI = new ActionFormData()
            .title('Coffee Machine')
            .body('Choose your coffee')
            .button('Americano', 'textures/RM_s_Cafe_Add_-_On/items/americano')
            .button('Latte', 'textures/RM_s_Cafe_Add_-_On/items/latte')
            .button('Cafe Au Delight', 'textures/RM_s_Cafe_Add_-_On/items/cafe_au_delight')
            .button('Cappuccino', 'textures/RM_s_Cafe_Add_-_On/items/cappucino')
            .button('Classic Coffee', 'textures/RM_s_Cafe_Add_-_On/items/classic_coffee')
        coffeeVendingUI.show(player).then((response) => {
            if (response.canceled) return;
            let itemName = "minecraft:iron_ingot"
            switch (response.selection) {
                case 0:
                    player.runCommand(`give @p[r=2] rm_cafe:americano`);
                    player.runCommand(`playsound random.orb @p[r=3]`);
                    break;
                case 1:
                    player.runCommand(`give @p[r=2] rm_cafe:lattte`);
                    player.runCommand(`playsound random.orb @p[r=3]`);
                    break;
                case 2:
                    player.runCommand(`give @p[r=2] rm_cafe:cafe_au_delight`);
                    player.runCommand(`playsound random.orb @p[r=3]`);
                    break;
                case 3:
                    player.runCommand(`give @p[r=2] rm_cafe:cappuccinio`);
                    player.runCommand(`playsound random.orb @p[r=3]`);
                    break;
                case 4:
                    player.runCommand(`give @p[r=2] rm_cafe:classic_coffee`);
                    player.runCommand(`playsound random.orb @p[r=3]`);
                    break;
            }
        });
    }
}

class RMCAFECoffeeVendingMachine {
    onPlayerInteract(event) {
        const { player, block, dimension } = event;
        const inventory = player.getComponent("inventory").container;
        const item = inventory.getItem(player.selectedSlotIndex);

        // Check if the player has an iron ingot
        if (item?.typeId !== "minecraft:iron_ingot") {
            player.onScreenDisplay.setActionBar('Please insert an iron ingot to activate the vending machine');
            return;
        };

        // Create the coffee vending UI
        const coffeeVendingUI = new ActionFormData()
            .title('Coffee Vending Machine')
            .body('Choose your coffee')
            .button('Americano\nCost: 1 Iron Ingot', 'textures/RM_s_Cafe_Add_-_On/items/americano')
            .button('Latte\nCost: 1 Iron Ingot', 'textures/RM_s_Cafe_Add_-_On/items/latte')
            .button('Cafe Au Delight\nCost: 1 Iron Ingot', 'textures/RM_s_Cafe_Add_-_On/items/cafe_au_delight')
            .button('Cappuccino\nCost: 1 Iron Ingot', 'textures/RM_s_Cafe_Add_-_On/items/cappucino')
            .button('Classic Coffee\nCost: 1 Iron Ingot', 'textures/RM_s_Cafe_Add_-_On/items/classic_coffee');

        coffeeVendingUI.show(player).then((response) => {
            if (response.canceled) return;

            // Define the coffee items
            const coffeeItems = [
                "rm_cafe:americano",
                "rm_cafe:latte", // Fixed spelling
                "rm_cafe:cafe_au_delight",
                "rm_cafe:cappuccino", // Fixed spelling
                "rm_cafe:classic_coffee"
            ];

            // Give the selected coffee and clear the iron ingot
            const selectedCoffee = coffeeItems[response.selection];
            player.runCommand(`give @p[r=2] ${selectedCoffee}`);
            player.runCommand(`clear @p[r=2] minecraft:iron_ingot 0 1`);
            player.runCommand(`playsound random.orb @p[r=3]`);
            player.onScreenDisplay.setActionBar(`Thank you for choosing our vending machine`);
        });
    }
}

////Frame Connections
var RMCafeFrameConnections = class {
    onTick(event) {
        const { block } = event;
        const directionLook = block.permutation.getState('minecraft:cardinal_direction');
        const directionOffsetsPosition = {
            north: {
                right: { x: 1, y: 0, z: 0 },
                left: { x: -1, y: 0, z: 0 },
                tag: "rm_cafe:SofaNorth"
            },
            south: {
                right: { x: -1, y: 0, z: 0 },
                left: { x: 1, y: 0, z: 0 },
                tag: "rm_cafe:SofaSouth"
            },
            west: {
                right: { x: 0, y: 0, z: -1 },
                left: { x: 0, y: 0, z: 1 },
                tag: "rm_cafe:SofaWest"
            },
            east: {
                right: { x: 0, y: 0, z: 1 },
                left: { x: 0, y: 0, z: -1 },
                tag: "rm_cafe:SofaEast"
            }
        };
        const OffsetPosition = directionOffsetsPosition[directionLook];
        if (OffsetPosition) {
            const PafaSofaRight = block.offset(OffsetPosition.right);
            const PafaSofaLeft = block.offset(OffsetPosition.left);
            block.setPermutation(
                block.permutation.withState(
                    "rm_cafe:sofa_left",
                    PafaSofaLeft.hasTag(OffsetPosition.tag)
                )
            )
            block.setPermutation(
                block.permutation.withState(
                    "rm_cafe:sofa_right",
                    PafaSofaRight.hasTag(OffsetPosition.tag)
                )
            )
        }
    };
}

////SEAT SYSTEM
world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('rm_cafe:sittable_system', {
        onPlayerInteract(e) {
            const { block, player } = e;
            const equipment = player.getComponent('equippable');
            const selectedItem = equipment.getEquipment('Mainhand');
            const entity = block.dimension.spawnEntity('rm_cafe:seatbro', { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
            const direction = block.permutation.getState("minecraft:cardinal_direction");
            const { x, y, z } = entity.location;

            // Apply rotation to the entity based on the block direction
            switch (direction) {
                case 'north':
                    entity.teleport(entity.location, { facingLocation: { x, y, z: z + 1 } });
                    break;
                case 'east':
                    entity.teleport(entity.location, { facingLocation: { x: x - 1, y, z } });
                    break;
                case 'south':
                    entity.teleport(entity.location, { facingLocation: { x, y, z: z - 1 } });
                    break;
                case 'west':
                    entity.teleport(entity.location, { facingLocation: { x: x + 1, y, z } });
                    break;
                default:
                    console.warn(`Unexpected direction: ${direction}`);
            }
        }
    });
});

////Alert Mode

var SetInPutaMode = class {
    onConsume(event) {
        event.source.addEffect("minecraft:speed", 500, {amplifier: 2});
        event.source.onScreenDisplay.setActionBar("You're in speed mode");
    };
};

//// Addon Initialization
console.log("RM's Café Add-on was Loaded on your device");
console.warn("RM's Café Add-on was Loaded on your device")