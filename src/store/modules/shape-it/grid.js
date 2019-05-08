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
  /**
   * Initialize the grid with given properties
   * @param {Object} param0 
   * @param {Object} gridOptions the options
   * @param {Number} gridOptions.length grid total length
   * @param {Number} gridOptions.width grid total width
   * @param {String} gridOptions.defaultCellStatus the cells default status
   * @param {String} gridOptions.defaultCellColor the cells default color
   * @param {String} gridOptions.defaultCellModule the cells default module
   */
  initializeGrid({ commit }, gridOptions) {
    const {
      length,
      width,
      defaultCellStatus,
      defaultCellColor,
      defaultCellModule
    } = gridOptions;
    let matrix = [];
    let matrixArray = [];
    const matrixArrayCell = {
      status: defaultCellStatus,
      color: defaultCellColor,
      module: defaultCellModule
    };

    commit('setGridSize', { length, width });

    for (let i = 0; i < length; i++) {
      matrixArray = [];
      for (let j = 0; j < width; j++)
        matrixArray.push({...matrixArrayCell, X: j, Y: i});
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
