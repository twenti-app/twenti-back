import Eureka from 'eureka-js-client';

export function initEureka(appName: string, port: number) {
    const client = new Eureka({
        instance: {
            instanceId: 'auth',
            app: appName,
            hostName: appName,
            ipAddr: 'eureka',
            port: {
                '$': port,
                '@enabled': 'true',
            },
            healthCheckUrl: 'http://auth:3000/health',
            statusPageUrl:'http://auth:3000/info',
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        eureka: {
            host: 'eureka',
            port: 8761,
            servicePath: '/eureka/apps',
            maxRetries: 10,
            requestRetryDelay: 2000,
            fetchMetadata: false
        },
    });

    client.logger.level('debug')

    client.start(error => {
        console.log(error || "auth service registered")
    });

    function exitHandler(options, exitCode) {
        if (options.cleanup) {
        }
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) {
            client.stop();
        }
    }

    client.on('deregistered', () => {
        process.exit();
        console.log('after deregistered');
    })

    client.on('started', () => {
        console.log("eureka host  " + '127.0.0.1');
    })

    process.on('SIGINT', exitHandler.bind(null, {exit: true}));
}