//This file will contain all questions in ReportLost feature of the app
// Each question will be an object with info

const lostQuestions = [
    {
        id: 1,
        key: "item",
        question: "What did you lose?",
        type: "checkbox",
        options: [
            "Wallet",
            "Keys",
            "Water Bottle",
            "Backpack",
            "Glasses",
            "Clothing Item",
            "Umbrella",
            "Other",
        ],
        required: true,
    },

    {
        id: 2,
        key: "description",
        question: "Describe your item.",
        type: "textbox",
        example: "Example: Green Owala with Columbia stickers.",
        required: true,
    },

    {
        id: 3,
        key: "location",
        question: "Where do you think you lose it?",
        type: "dropdown",
        options: [
             "Butler Library",
            "Lerner Hall",
            "Pupin Hall",
            "Northwest Corner",
            "Dodge Hall",
            "John Jay Hall",
            "Carman Hall",
            "Hamilton Hall",
            "Low Library",
            "Mudd Building",
            "I don't know",
        ],
        required: true,
    },

    {
        id: 4,
        key: "date",
        question: "When did you last have it?",
        type: "checkbox",
        options: [
            "Today",
            "Yesterday",
            "This week",
            "Earlier",
        ],
        required: true,
    }
];

export default lostQuestions;