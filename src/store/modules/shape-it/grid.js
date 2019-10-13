import { CELL } from '@/utils/constants/index';
import { filter, flatten, isEmpty } from '@/utils/fp';
import cache from '@/storage/cache';

const state = {
  height: 10,
  width: 10,
  gridMatrix: []
};

const getters = {
  modifiedMatrixCells: state => {
    return filter(cell => cell.status !== CELL.STATUS.DEFAULT, flatten(state.gridMatrix));
  },
  isMatrixUntouched: state => {
    return !state.gridMatrix.some(array => {
      return array.some(cell => cell.status !== CELL.STATUS.DEFAULT);
    });
  },
  getCell: state => ({ X, Y }) => state.gridMatrix[Y][X]
};

const actions = {
  /**
   * Set Cache Data
   *  - Retrieve cached data and hydrate the store
   * @param {Object} context
   */
  async setCacheData({ commit }) {
    const cells = await cache.get('GRID', 'CELLS');

    if (isEmpty(cells))
      cache.set('GRID', 'CELLS', []);

    cells.forEach((cell) => {
      commit('mutateCellData', cell);
    });
  },
  /**
   * Initialize the grid with given properties
   * @param {Object} param0 
   * @param {Object} gridOptions the options
   * @param {Number} gridOptions.height grid total height
   * @param {Number} gridOptions.width grid total width
   * @param {String} gridOptions.defaultCellStatus the cells default status
   * @param {String} gridOptions.defaultCellColor the cells default color
   * @param {String} gridOptions.defaultCellModule the cells default module
   */
  initializeGrid({ commit }, gridOptions) {
    const {
      height,
      width,
      defaultCellStatus,
      defaultCellColor,
      defaultCellModule,
      patternHeight,
      patternWidth
    } = gridOptions;
    let matrix = [];
    let matrixArray = [];
    const matrixArrayCell = {
      status: defaultCellStatus,
      color: defaultCellColor,
      module: defaultCellModule
    };
    const gridSize = {
      height: Math.floor(height / patternHeight),
      width: Math.floor(width / patternWidth)
    }

    commit('setGridSize', gridSize);

    for (let i = 0; i < gridSize.height; i++) {
      matrixArray = [];
      for (let j = 0; j < gridSize.width; j++) {
        matrixArray.push({...matrixArrayCell, X: j, Y: i});
      }
      matrix.push(matrixArray);
    }

    commit('setGridContent', matrix);
  },
  async setCellData({ commit, getters }, cell) {
    commit('mutateCellData', cell);
    await cache.set('GRID', 'CELLS', getters.modifiedMatrixCells);
  },
  async resetGrid({ commit }) {
    commit('setGridContent', []);
    commit('setGridSize', {});
    await cache.set('GRID', 'CELLS', undefined);
  }
};

const mutations = {
  setGridSize(state, { height, width }) {
    state.height = height;
    state.width = width;
  },
  setGridContent(state, matrix) {
    state.gridMatrix = matrix;
  },
  mutateCellData(state, { X, Y, status, color, module }) {
    state.gridMatrix[Y][X].status = status;
    state.gridMatrix[Y][X].color = color;
    state.gridMatrix[Y][X].module = module;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
