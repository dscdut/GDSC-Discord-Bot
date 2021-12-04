export class ModulesInfoHandler {
    #allModulesInfo = []

    static builder() {
        return new ModulesInfoHandler();
    }

    collectAllModulesInfo(modules) {
        modules.forEach(module => {
            this.#allModulesInfo = this.#allModulesInfo.concat(module.collectInfo());
        });
        return this;
    }

    getAllModulesInfo() {
        return this.#allModulesInfo;
    }
}
