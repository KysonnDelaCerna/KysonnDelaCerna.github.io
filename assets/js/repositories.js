const app = Vue.createApp({
    template: `
        <div class="relative bg-fixed bg-cover bg-gray-900 w-full" style="background-image: url(https://picsum.photos/1920/1080)">
            <h1 class="text-white text-center font-bold text-5xl lg:text-6xl py-8 lg:py-10 filter drop-shadow-lg relative z-10">Github Repositories</h1>

            <div v-if="!repositories">
                <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg">Can't get Github repositories</h2>
            </div>
            
            <div v-if="repositories.length === 0">
                <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg">Loading Github repositories</h2>
            </div>

            <div v-else class="lg:grid lg:grid-cols-2 w-11/12 lg:w-4/5 mx-auto lg:gap-8">
                <div v-for="repository in repositories" class="pb-4 relative z-10">
                    <div class="flex flex-row justify-between bg-white bg-opacity-90 mx-auto rounded-lg p-5 filter drop-shadow-lg w-full lg:h-48">
                        <div class="flex flex-col items-start space-y-1 w-2/3 lg:w-4/5">
                            <h1 class="font-bold text-xl break-all w-full">{{ repository.name }}</h1>
                            <h2 class="font-semibold text-lg break-all w-full">{{ repository.description }}</h2>
                            <h2 class="break-all w-full">Made with: {{ repository.language }}</h2>
                        </div>
                        <div class="w-24 ml-4">
                            <div class="flex flex-col items-end space-y-2">
                                <a :href="repository.html_url"><button class="rounded-md bg-indigo-500 text-white font-semibold p-2 hover:bg-indigo-700 w-24">
                                    Repository
                                </button></a>
                                <a v-if="repository.homepage" :href="repository.homepage"><button class="rounded-md bg-indigo-500 text-white font-semibold p-2 hover:bg-indigo-700 w-24">
                                    Website
                                </button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-2 lg:py-6"></div>

            <div class="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
        </div>
    `,
    data () {
        return {
            repositories: [],
        }
    },
    created () {
        axios.get('https://api.github.com/users/KysonnDelaCerna/repos')
        .then(({ data }) => {
            this.repositories = data;
        }).catch(() => {
            this.repositories = null;
        });
    }
})

app.mount('#repositories');