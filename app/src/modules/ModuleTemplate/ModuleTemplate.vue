<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
    <div>
        <AppWrapper
        :eep-app="eepApp">
            <!-- Here is where all of the content goes for the ModuleTemplate app -->
        </AppWrapper>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
    import storeModule from './store/index';
    import { EventBus } from '../../EventBus';

    const moduleName = 'ModuleTemplate';

    export default {
        name: moduleName,
        components: {
            AppWrapper,
        },
        beforeCreate(){

        },
        created(){

        },
        data(){
            return{
                eepApp: {
                    id: 'module-template',
                    title: 'Module Template',
                    source: {
                        text: '',
                        link: '',
                    },
                    html: {
                        mainCard: '',
                    },
                },
            }
        },
        mounted(){

        },
        computed:{
            ...mapGetters({
                // map getters go here
            }),
        },
        methods: {
            ...mapActions(moduleName, [
                // map actions go here
            ]),
        }
    }
</script>

<style scoped
       lang="scss">
</style>