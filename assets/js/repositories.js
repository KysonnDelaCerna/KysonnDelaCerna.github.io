const app = Vue.createApp({
    template: `
        <div class="relative bg-gray-900 w-full pb-16">
            <showcase class="showcase" title="Github Repositories" :projects="repositories" :perRow="perRow" @finished="showcaseFinished" />

            <showcase class="showcase" title="Contributing" :projects="forks" :perRow="perRow" @finished="showcaseFinished" />
        </div>
    `,
    data () {
        return {
            repositories: [],
            forks: [],
            finishedShowcases: 0,
            windowWidth: 0,
        }
    },
    mounted () {
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
    },
    created () {
        window.addEventListener("resize", this.updateWindowSize);
        this.updateWindowSize();
    }, 
    destroyed () {
        window.removeEventListener("resize", this.updateWindowSize);
    },
    computed: {
        perRow() {
            if (this.windowWidth >= 768) {
                return Math.floor((this.windowWidth - 32 * 2) / 384);
            } else {
                return Math.floor(this.windowWidth / 320);
            }
        }
    },
    methods: {
        showcaseFinished () {
            this.finishedShowcases += 1;

            if (this.finishedShowcases == 2) {
                this.observe();
            }
        },
        updateWindowSize () {
            this.windowWidth = Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
            );
        },
        observe () {
            const obeserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            });
            
            const animate = document.querySelectorAll('.animate');
            animate.forEach((element) => obeserver.observe(element));
        },
    }
});

app.component('card', {
    props: ['link', 'name', 'desc', 'lang'],
    data () {
        return {
            langClass: ''
        }
    },
    template: `
    <a :href="link" target="_blank" class="animate">
        <div class="w-80 h-64 md:w-96 md:h-72 bg-white border-t-4 border-solid p-6 relative rounded-lg drop-shadow-lg card border-orange-600 text-orange-600 transition ease-in-out duration-150 hover:border-orange-500 hover:text-orange-500 hover:rotate-3 hover:scale-105 z-10">
            <h1 class="font-bold text-lg md:text-2xl break-all w-full mb-4 text-slate-800">{{ name }}</h1>
            <h2 class="font-semibold text-md md:text-xl break-words w-full text-slate-700">{{ desc }}</h2>
            <i class="text-7xl absolute bottom-6 right-6" :class="langClass"></i>
        </div>
    </a>
    `,
    mounted () {
        if (this.lang === 'HTML') {
            this.langClass = `devicon-html5-plain`;
        } else {
            this.langClass = `devicon-${this.lang}-plain`;
        }

        this.$emit('finished');
    }
});

app.component('showcase', {
    props: ['title', 'projects', 'perRow'],
    data () {
        return {
            finishedCards: 0,
        }
    },
    template: `
        <div>
            <h1 class="text-white text-center font-bold text-5xl lg:text-6xl py-8 lg:py-10 filter drop-shadow-lg relative z-10">{{ title }}</h1>

            <div v-if="!projects">
                <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg">Can't get Github repositories</h2>
            </div>
            
            <div v-if="projects.length === 0">
                <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg">Loading Github repositories</h2>
            </div>

            <div v-else class="flex flex-row flex-wrap justify-evenly content-evenly md:px-8">
                <card class="my-4" :link="project.html_url" :name="project.name" :desc="project.description" :lang="project.language" :style="perRow <= 1 ? '--order: 1;' : '--order: ' + ((index % perRow) + 1) + ';'" v-for="(project, index) in projects" @finished="cardFinished" />
            </div>
        </div>
    `,
    methods: {
        cardFinished () {
            this.finishedCards += 1;

            if (this.finishedCards == this.projects.length) {
                this.$emit('finished');
            }
        }
    },
});

app.mount('#repositories');