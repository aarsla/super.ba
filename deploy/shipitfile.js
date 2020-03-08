require('dotenv').config()
const path = require('path')

module.exports = shipit => {
  require('shipit-deploy')(shipit)
  require('shipit-pm2')(shipit)
  require('shipit-slack')(shipit)

  shipit.config.copy = false

  shipit.initConfig({
    default: {
      repositoryUrl: process.env.GIT_REPO,
      keepReleases: 5,
      slack: {
        webhookUrl: process.env.SLACK_WEBHOOK,
        message: 'Super app deployed',
        triggerEvent: 'deployed'
      }
    },
    production: {
      deployTo: '/srv/super',
      servers: `${process.env.SSH_USER}@${process.env.SERVER}`,
      branch: 'master',
      pm2: {
        json: '/srv/super/current/deploy/pm2/production.json'
      }
    }
  })

  shipit.on('updated', function () {
    console.log('Build project...')
    shipit.start('app:build')
  })

  shipit.blTask('app:build', async () => {
    const releaseDir = path.join(shipit.releasesPath, shipit.releaseDirname)
    const env = shipit.options.environment

    if (env === 'production') {
      await shipit.remote(`cd ${releaseDir} && cp /srv/super/env/parser/.env ./parser/.env`)
      await shipit.remote(`cd ${releaseDir} && cp /srv/super/env/api/.env ./api/.env`)
      await shipit.remote(`cd ${releaseDir} && cp /srv/super/env/web/.env ./web/.env`)
    }

    await shipit.remote(`cd ${releaseDir}/parser && yarn install`)
    await shipit.remote(`cd ${releaseDir}/api && yarn install`)
    await shipit.remote(`cd ${releaseDir}/web && yarn install`)
    await shipit.remote(`cd ${releaseDir}/web && NODE_ENV=${env} yarn run build --mode ${env}`)
  })
}
