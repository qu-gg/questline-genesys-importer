class IdManager {
    constructor() {
        this.nameToId = new Map();
    }

    getId(itemName) {
        if (!this.nameToId.has(itemName)) {
            this.nameToId.set(itemName, this.generateUUID().slice(0, 20));
        }
        return this.nameToId.get(itemName);
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).replace(/-/g, '');
    }
}

function convertItem(item, idManager) {
    const vtt_item = {
        actions: [],
        type: "genesys",
        version: 1,
        name: item?.name || "",
        creator: "SYSTEM",
        description: "",
        privacy: {
            users: [],
            level: "public"
        },
        data: {
            type: item?.type || "",
            subtype: "",
            rarity: item?.rarity || 0,
            skill: "",
            damage: "",
            critical: "",
            range: "",
            cost: {
                gold: item?.price || 0
            },
            encumbrance: item?.encumbrance || 0,
            defense: "",
            soak: "",
            special: ""
        },
        id: idManager.getId(item?.name || ""),
        uses: {
            max: 0
        }
    };

    // Handle description
    if (Array.isArray(item?.description)) {
        vtt_item.description = item.description
            .map(d => typeof d === 'string' ? d : '')
            .join(" ");
    } else if (typeof item?.description === 'string') {
        vtt_item.description = item.description;
    }

    // Handle weapon-specific properties - only if the required fields exist
    if (item?.damage !== undefined || item?.critical !== undefined || 
        item?.range !== undefined || item?.skill?.name !== undefined) {
        Object.assign(vtt_item.data, {
            damage: String(item.damage || ""),
            critical: String(item.critical || ""),
            range: String(item.range || ""),
            skill: item.skill?.name || ""
        });
    }

    // Handle armor-specific properties - only if the required fields exist
    if (item?.defense !== undefined || item?.soak !== undefined) {
        Object.assign(vtt_item.data, {
            defense: String(item.defense || ""),
            soak: String(item.soak || "")
        });
    }

    // Handle special qualities
    if (item?.qualities) {
        const specialQualities = item.qualities.map(quality => {
            let qualityText = quality.name;
            if ('ranks' in quality) {
                qualityText += ` ${quality.ranks}`;
            }
            return qualityText;
        });
        vtt_item.data.special = specialQualities.join(", ");
    }

    return vtt_item;
}

async function convertGenesysToVTT(sourceData) {
    const idManager = new IdManager();
    const allItems = [];
    
    // Define valid categories (case-insensitive)
    const validCategories = new Set([
        'alchemy',
        'armor',
        'artifact',
        'attachment',
        'cybernetic',
        'g-mod',
        'gear',
        'implement',
        'mount',
        'treasure',
        'weapon'
    ]);

    // Process only valid categories
    for (const [category, items] of Object.entries(sourceData)) {
        if (validCategories.has(category.toLowerCase()) && Array.isArray(items)) {
            allItems.push(...items);
        }
    }

    return allItems.map(item => convertItem(item, idManager));
}