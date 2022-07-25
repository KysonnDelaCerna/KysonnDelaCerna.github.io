const app = Vue.createApp({
    template: `
        <div class="relative bg-gray-900 w-full">
            <showcase title="Github Repositories" :projects="repositories" />

            <showcase title="Contributing" :projects="forks" />
        </div>
    `,
    data () {
        return {
            repositories: [],
            forks: [],
        }
    },
    created () {
        axios.get('https://api.github.com/users/KysonnDelaCerna/repos')
        .then(({ data }) => {
            data.forEach((repo) => {
                if (repo.fork) {
                    this.forks.push(repo);
                } else {
                    this.repositories.push(repo);
                }
            });
        }).catch(() => {
            this.repositories = null;
            this.forks = null;
        });
    }
});

app.component('card', {
    props: ['link', 'name', 'desc', 'lang'],
    data: function () {
        return {
            langClass: ''
        }
    },
    template: `
    <a :href="link" target="_blank">
        <div class="my-4 w-96 h-72 bg-white border-t-4 border-solid p-6 relative rounded-lg drop-shadow-lg card border-orange-600 text-orange-600 transition ease-in-out duration-150 hover:border-orange-500 hover:text-orange-500 hover:rotate-3 hover:scale-105 z-10">
        <h1 class="font-bold text-2xl break-all w-full mb-4 text-slate-800">{{ name }}</h1>
        <h2 class="font-semibold text-xl break-words w-full text-slate-700">{{ desc }}</h2>
        <i class="text-7xl absolute bottom-6 right-6" :class="langClass"></i>
        </div>
    </a>
    `,
    mounted: function () {
        if (this.lang === 'HTML') {
            this.langClass = `devicon-html5-plain`;
        } else {
            this.langClass = `devicon-${this.lang}-plain`;
        }
    }
});

app.component('showcase', {
    props: ['title', 'projects'],
    template: `
        <h1 class="text-white text-center font-bold text-5xl lg:text-6xl py-8 lg:py-10 filter drop-shadow-lg relative z-10">{{ title }}</h1>

        <div v-if="!projects">
            <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg">Can't get Github repositories</h2>
        </div>
        
        <div v-if="projects.length === 0">
            <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg">Loading Github repositories</h2>
        </div>

        <div v-else class="flex flex-row flex-wrap justify-evenly">
            <card :link="project.html_url" :name="project.name" :desc="project.description" :lang="project.language" v-for="project in projects"/>
        </div>
    `
});

app.mount('#repositories');