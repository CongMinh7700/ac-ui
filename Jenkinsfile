pipeline {
    agent any

    environment {
        NODEJS_HOME = 'C:\\Program Files\\nodejs'
        YARN_HOME = 'C:\\Users\\Deployer\\AppData\\Roaming\\npm'
        PATH = "${NODEJS_HOME};${YARN_HOME};${env.PATH}"
        DEPLOY_PATH = 'ac-ui/publish'
    }

    stages {
        stage('Clone Source') {
            steps {
                git credentialsId: 'CongMinh7700', url: 'https://github.com/CongMinh7700/ac-ui.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'yarn install'
            }
        }

        stage('Type Check') {
            steps {
                bat 'yarn tsc --noEmit'
            }
        }

        stage('Test') {
            steps {
                bat 'yarn test --watchAll=false --passWithNoTests'
            }
        }

        stage('Build') {
            environment {
                CI = 'false' // tránh cảnh báo warning khi build
            }
            steps {
                bat 'yarn build'
            }
        }

        stage('Archive Build') {
            steps {
                // Dùng tar của Git Bash hoặc thêm vào PATH nếu cần
                bat 'tar -czf build.tar.gz build ecosystem.config.js'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'UbtServiceDev',
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'build.tar.gz',
                                        removePrefix: '',
                                        remoteDirectory: "${env.DEPLOY_PATH}",
                                        execCommand: """
                                            cd ${env.DEPLOY_PATH} &&
                                            tar -xzf build.tar.gz &&
                                            rm build.tar.gz &&
                                            yarn install --production || true &&
                                            pm2 startOrReload ecosystem.config.js
                                        """.stripIndent(),
                                        execTimeout: 300000
                                    )
                                ],
                                usePromotionTimestamp: false,
                                verbose: true
                            )
                        ]
                    )
                }
            }
        }
    }

    post {
        success {
            echo '✅ UI Deployed Successfully!'
        }
        failure {
            echo '❌ UI Deployment Failed!'
        }
        always {
            cleanWs()
        }
    }
}
