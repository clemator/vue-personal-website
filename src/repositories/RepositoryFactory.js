import authenticationRepository from './authenticationRepository'

const repositories = {
  authentication: authenticationRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}