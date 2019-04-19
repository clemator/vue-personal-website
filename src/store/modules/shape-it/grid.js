import { CELL } from './../../../utils/constants/index';

const state = {
  length: 10,
  width: 10,
  gridMatrix: []
};

const getters = {
  touchedMatrixCells: state => {
    return state.gridMatrix;
  },
  isUntouched: state => {
    return !state.gridMatrix.some(array => {
      return array.some(cell => cell.status !== CELL.STATUS.DEFAULT);
    });
  }
};

const actions = {
  initializeGrid({ commit }, gridOptions) {
    const {
      length,
      width,
      defaultStatus,
      defaultColor,
      defaultModule
    } = gridOptions;
    let matrix = [];
    let matrixArray = [];
    const matrixArrayCell = {
      status: defaultStatus,
      color: defaultColor,
      module: defaultModule
    };

    commit('setGridSize', { length, width });

    for (let i = 0; i < length; i++) {
      matrixArray = [];
      for (let j = 0; j < width; j++)
        matrixArray.push(matrixArrayCell);
      matrix.push(matrixArray);
    }

    commit('setGridContent', matrix);
  },
  changeCellStatus({ commit }, cell) {
    commit('setCellStatus', cell);
  }
};

const mutations = {
  setGridSize(state, { length, width }) {
    state.length = length;
    state.width = width;
  },
  setGridContent(state, matrix) {
    state.gridMatrix = matrix;
  },
  setCellStatus(state, { status, position, index }) {
    state.gridMatrix[index][position].status = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
