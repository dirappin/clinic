module.exports = {
    updater: {
        enabled: true, // Enable auto-updater
        checkOnStartup: true, // Check for updates on startup
        repo: "https://github.com/dirappin/clinic", // Replace with your GitHub repository URL
        provider: "github", // Choose provider (GitHub, npm, etc.)
        // Optional:
        // `channel`: "beta", // Specify update channel (e.g., beta)
        // `shouldNotifyForChannels`: ["beta"], // Notify for specific channels
        // `releaseVerification`: { // Secure updates with code signing
        //   provider: "github",
        //   key: "YOUR_CODE_SIGNING_KEY"
        // }
    },
    packagerConfig: {
        ignore: [
            /^\/src/,
            /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/,
        ],
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
};