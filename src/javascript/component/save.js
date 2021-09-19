const createInitSession = function() {
    window.localStorage.clear();
    if (window.localStorage.getItem("todoListHeaders") === null) {
        console.log("Initializing first session");
        const todoListHeaders = [
            'main',
            'social',
            'gym',
            'groceries',
            'finance'
        ];

        const todoList = {
            'main': {},
            'social': {},
            'gym': {},
            'groceries': {},
            'finance': {}
        };

        todoList['main'] = {
            description: "Did you realize that you're a champion in their eyes?",
            items: [
                {
                    checked: false,
                    content: "This is the story of a champion",
                    deadline: "2021-09-24"
                },
                {
                    checked: true,
                    content: "Runners on your mark and they pop the guns",
                    deadline: "2021-09-25"
                },
                {
                    checked: false,
                    content: "Stand up, stand up, here he comes",
                    deadline: "2021-09-26"
                },
                {
                    checked: false,
                    content: "Tell me, what it takes to be number one",
                    deadline: "2021-09-27"
                }
            ]
        };

        window.localStorage.setItem('todoListHeaders', JSON.stringify(todoListHeaders));
        window.localStorage.setItem('todoList', JSON.stringify(todoList));
    }
    else {
        console.log("Remembering past session");
    }
};

export {createInitSession}