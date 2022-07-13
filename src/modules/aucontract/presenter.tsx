import AuContractRepository from "@modules/aucontract/repository";
import store from "@store/redux";
import auContractStore from "@modules/aucontract/auContractStore";


const auContractPresenter = {...AuContractRepository};


auContractPresenter.newAuContract = async (data, idCont, arrMedia) => {

    const response =  await AuContractRepository.newAuContract(data, idCont, arrMedia);
    return response;
};


export default auContractPresenter;