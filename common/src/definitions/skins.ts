import { cloneDeep } from "../utils/misc";
import { ItemType, ObjectDefinitions, type ItemDefinition } from "../utils/objectDefinitions";

/*
    eslint-disable @stylistic/no-multi-spaces
*/

/*
    `@stylistic/no-multi-spaces`: Disabled to allow nicer alignment
*/

export interface SkinDefinition extends ItemDefinition {
    readonly itemType: ItemType.Skin
    readonly hideFromLoadout: boolean
    readonly grassTint: boolean
    readonly backpackTint?: number
    readonly hideEquipment: boolean
    readonly rolesRequired?: string[]
    readonly hideBlood: boolean
    readonly noSwap?: boolean
    readonly shiny?:boolean
    readonly frame?:string
}

export const Skins = ObjectDefinitions.withDefault<SkinDefinition>()(
    "Skins",
    {
        itemType: ItemType.Skin,
        noDrop: false,
        hideFromLoadout: false,
        grassTint: false,
        hideEquipment: false,
        hideBlood: false,
        shiny:false,
    },
    ([derive, , createTemplate]) => {
        const skin = derive((name: string, backpackTint?: number) => ({
            idString: name.toLowerCase().replace(/'/g, "").replace(/ /g, "_"),
            backpackTint,
            name,
        }));

        const hidden = createTemplate(skin, {
            hideFromLoadout: true
        });

        const withRole = createTemplate(skin, (roles: string[]) => ({
            rolesRequired: roles
        }));
        const ret=[
            ...([
                ["HAZEL Jumpsuit",  0xb4a894],
                ["The Amateur",     0x9b8767],
                ["The Pro",         0x9d732c],
                ["Forest Camo",     0x634421],
                ["Desert Camo",     0xdcc993],
                ["Arctic Camo",     0xececec],
                ["Bloodlust",       0x565656],
                ["Red Tomato",      0xff0000],
                ["Greenhorn",       0x00ff00],
                ["Blue Blood",      0x0000ff],
                ["Silver Lining",   0xe1e1e1],
                ["Pot o' Gold",     0xffd852],
                ["Gunmetal",        0x4c4c4c],
                ["Algae",           0x00e0e3],
                ["Twilight Zone",   0x2bb0fe],
                ["Bubblegum",       0xea94ff],
                ["Sunrise",         0x495f8c],
                ["Sunset",          0xfcb045],
                ["Stratosphere",    0x0079ff],
                ["Mango",           0xff7c00],
                ["Snow Cone",       0x00ebff],
                ["Aquatic",         0x00326a],
                ["Floral",          0xdc73bd],
                ["Sunny",           0xfce570],
                ["Volcanic",        0xfd5900],
                ["Ashfall",         0x45aafc],
                ["Solar Flare",     0xffa500],
                ["Beacon",          0x474053],
                ["Wave Jumpsuit",   0xaf9c3f],
                ["Toadstool",       0xd6d6d6],
                ["Full Moon",       0xc1c1c1],
                ["Swiss Cheese",    0xffcd00],
                ["Target Practice", 0xff0000],
                ["Zebra",           0x4a4a4a],
                ["Tiger",           0x4a4a4a],
                ["Bee",             0x4a4a4a],
                ["Armadillo",       0xa68c5e],
                ["Printer",         0xffffff],
                ["Distant Shores",  0x7eca83],
                ["Hasanger",        0x640000],
                ["123OP",           0x0000ff],
                ["leia",            0x060647],
                ["radians",         0x060647],
                ["LimeNade",        0xffffff],
                ["Dragonscale",     0x3f808d],
                ["error",           0x1fc462],
                ["pap",             0x060647],
                //Originals
                ["max_mcfly",       0xff931c],
                ["amanda_corey",    0xff1cd2],
                ["anonymous",       0xff1cd2]
            ] satisfies ReadonlyArray<readonly [string, number]>).map(([name, tint]) => skin([name, tint])),
            ...([
                ["Lemon",                 0xebe092],
                ["Flamingo",              0xf1847d],
                ["Peachy Breeze",         0xf2a263],
                ["Deep Sea",              0x284553],
                ["Basic Outfit",          0xdd9b0a],
                ["Peppermint",            0xb40030],
                ["Spearmint",             0x115724],
                ["Coal",                  0x424242],
                ["Henry's Little Helper", 0x059100],
                ["Candy Cane",            0xf4f4f4],
                ["Holiday Tree",          0x23883f],
                ["Gingerbread",           0xb55c12],
                ["Light Choco",           0xffd99e],
                ["Frosty",                0xa2f3ff],
                ["Verified",              0x4790ff],
                ["no kil pls",            0x6b6b6b],
                ["Stardust",              0x16448b],
                ["Aurora",                0x1d2f58],
                ["Nebula",                0x28a0b7],
                ["1st Birthday",          0xed8080],
                ["Lumberjack",            0x924a24],
                ["Gold Tie Event",        0x2b2929],
                ["Ship Carrier",          0x679bd9],
                ["NSD Uniform",           0x593b26],
                ["Pumpkified",            0x402000],
                ["One at NSD",            0x27331a],
                ["Sky",                   0x002121],
                ["Diseased",              0x2d1f1f],
                ["Deer Season",           0x9a3604],
                //Originals
            ] satisfies ReadonlyArray<readonly [string, number]>).map(([name, tint]) => hidden([name, tint])),
        ]
        const shinySkin=derive((base:string)=>{
            let b:SkinDefinition|undefined
            base=base.toLowerCase().replace(/'/g, "").replace(/ /g, "_")
            for(const s of ret){
                if(s.idString==base){
                    b=cloneDeep(s) as SkinDefinition
                    break
                }
            }
            //@ts-ignore
            b.hideFromLoadout=true
            //@ts-ignore
            b.shiny=true
            //@ts-ignore
            b.frame=base
            //@ts-ignore
            b.idString="shiny_"+base
            return b!
        })

        ret.push(...[
            ...([
                ["hasanger"],
                ["123op"],
                ["error"],
                ["pap"],
                ["amanda_corey"],
                ["max_mcfly"],
                ["anonymous"],
                ["leia"],
            ] satisfies ReadonlyArray<readonly [string]>).map(([name]) => shinySkin([name])),
            hidden(
                ["Werewolf", 0x323232],
                {
                    noSwap: true,
                    noDrop: true
                }
            ),
            hidden(
                ["Ghillie Suit", 0xffffff],
                {
                    grassTint: true,
                    hideEquipment: true,
                    hideBlood: true
                }
            )
        ])
        return ret
    }
);
