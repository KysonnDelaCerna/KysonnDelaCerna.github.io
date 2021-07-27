const app = Vue.createApp({
    template: `
        <div class="relative bg-fixed bg-cover bg-gray-900 w-full" style="background-image: url(https://picsum.photos/1920/1080)">
            <h1 class="text-white text-center font-bold text-5xl lg:text-6xl py-8 lg:py-10 filter drop-shadow-lg relative z-10">Github Repositories</h1>

            <div v-if="repositories" v-for="repository in repositories" class="pb-4 relative z-10">
                <div class="flex flex-row justify-between bg-white bg-opacity-90 w-11/12 lg:w-4/5 mx-auto rounded-lg p-5 filter drop-shadow-lg">
                    <div class="w-2/3 lg:w-5/6">
                        <h1 class="font-bold text-xl break-words">{{ repository.name }}</h1>
                        <h2 class="font-semibold text-lg break-words">{{ repository.description }}</h2>
                        <h2 class="break-words">Made with: {{ repository.language }}</h2>
                    </div>
                    <div class="pl-4 w-1/3 lg:w-1/6">
                        <div class="flex flex-col items-end">
                            <a :href="repository.html_url"><button class="rounded-md bg-indigo-500 text-white font-semibold p-2 hover:bg-indigo-700 mb-2">
                                Repository
                            </button></a>
                            <br/>
                            <a v-if="repository.homepage" :href="repository.homepage"><button class="rounded-md bg-indigo-500 text-white font-semibold p-2 hover:bg-indigo-700">
                                Website
                            </button></a>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10">Can't get Github repositories</h2>
            </div>

            <div class="py-2 lg:py-6"></div>

            <div class="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
        </div>
    `,
    data () {
        return {
            repositories: null,
        }
    },
    created () {
        axios.get('https://api.github.com/users/KysonnDelaCerna/repos')
        .then(({ data }) => {
            this.repositories = data;
        });
    }
})

app.mount('#repositories');