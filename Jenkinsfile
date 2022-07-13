pipeline {
    // agent any
    agent {
        docker {
            image 'node'
           // args '-p 3456:3456'
        }
    }
    environment {
        CI = 'true'
        PRINT_EVN = 'true'
        COMMAND = GetCommitParams(0)
        DEPLOY_FILENAME = 'deploy.sh'

        // Development server information
        HOST = '192.168.11.61'
        CREDENTIAL_NAME = 'mtc2021devpem'
        SERVER_WORKING_DIR = '/data/vcpmc_frontend'
        LOCAL_BUILD_DIR = 'dist'
        STATIC_DEPLOY_DIR = 'cms'
        IS_BACKUP = 'true'
        BACKUP_DEPLOY_DIR = 'cms_bk'
        MAX_BACKUP_VERSION = 5
        VERSION_FILENAME = 'previous.txt'

        SONAR_PROJECT_KEY = 'MTC-2021'
        SONAR_PROJECT_NAME = 'MTC2021'
    }
    stages {
        // stage('Test') {
        //     steps {
        //         echo "${COMMAND}"
        //     }
        // }

//         stage('CI Info') {
//             steps {
//                 echo 'Process CI for ' + env.BRANCH_NAME + ' branch!!'
//                 script {
//                     if(env.PRINT_EVN == 'true') {
//                         sh 'printenv'
//                     } else {
//                         echo 'Did not print EVN because ignore setting!!!'
//                     }
//                 }
//             }
//         }

//         stage('Code Quality'){
//                     when{
//                         anyOf {
//                             expression { env.BRANCH_NAME.contains("feature/")  && "${COMMAND}" == "REVIEW"}
//                             expression { "${env.BRANCH_NAME}" == 'develop' || "${env.BRANCH_NAME}" == 'release' || "${env.BRANCH_NAME}" == 'master'}
//                         }
//                     }
//                     agent { docker 'sonarsource/sonar-scanner-cli:latest' } 
//                     environment { 
//                         scannerHome = tool 'AltaScanner'
//                     }
//                     steps {
//                         withSonarQubeEnv('AltaSonar') {
//                             sh '''
//                             ${scannerHome}/bin/sonar-scanner \
//                             -D sonar.projectKey=${SONAR_PROJECT_KEY} \
//                             -D sonar.projectName=${SONAR_PROJECT_NAME} \
//                             -D sonar.sources=./src 
//                             '''
//                         }
//                     }
//                 }
// //FE
        

//         stage('Test') {
//             when{
//                 anyOf{
//                     expression { "${env.BRANCH_NAME}" == 'develop' || "${env.BRANCH_NAME}" == 'release' || "${env.BRANCH_NAME}" == 'master'}
//                     expression { env.BRANCH_NAME.contains("feature/")  && "${COMMAND}" == "REVIEW"}
//                 }
//             }
//             steps {
//                 echo "Test"
//             }
//         }

        stage('Install') {
            when{
                expression { "${env.BRANCH_NAME}" == 'develop' || "${env.BRANCH_NAME}" == 'release' || "${env.BRANCH_NAME}" == 'master'}
            }
            steps {
                sh 'npm ci --prefer-offline --no-audit'
            }
        }

        stage('Build') {
            when{
                expression { "${env.BRANCH_NAME}" == 'develop' || "${env.BRANCH_NAME}" == 'release' || "${env.BRANCH_NAME}" == 'master'}
            }
            steps {
                sh 'npm rebuild node-sass'
                sh 'npm run build' 
            }
        }

        stage('Deploy') { 
            parallel {
                stage('Dev Server') {
                    when{
                        expression { "${env.BRANCH_NAME}" == 'develop' || "${env.BRANCH_NAME}" == 'release'}
                    }
                    environment {
                        VERSION = "${LOCAL_BUILD_DIR}/${VERSION_FILENAME}"
                    }
                    steps {
                        script {
                            if (env.BRANCH_NAME == 'develop' ){
                                // Create version file for backup artifact on remote server
                                sh "if [ -f ${VERSION} ] ; then rm ${VERSION} ; fi"
                                sh "touch ${VERSION}"
                                sh "echo ${GIT_COMMIT}>>${VERSION}"
                                sh "cat ${VERSION}"

                                DeployViaKeypem("${CREDENTIAL_NAME}","${HOST}","${DEPLOY_FILENAME}","${SERVER_WORKING_DIR}","${LOCAL_BUILD_DIR}","${STATIC_DEPLOY_DIR}","${BACKUP_DEPLOY_DIR}","${IS_BACKUP}","${MAX_BACKUP_VERSION}","${VERSION_FILENAME}")
                            }

                        }
                    }
                }

                stage('Product Server'){
                    when{
                        expression { "${env.BRANCH_NAME}" == 'master' }
                    }
                    environment {
                        VERSION = "${LOCAL_BUILD_DIR}/${VERSION_FILENAME}"
                    }
                    steps {
                        echo "Product deploy"
                    }
                }
            }

            
            

        }

        // stage('CheckBranch'){
        //     steps {
        //         script {
        //             echo 'CheckBranch'
        //             if (env.BRANCH_NAME == 'master') {
        //                 echo 'master'
        //             } else  if (env.BRANCH_NAME == 'develop') {
        //                 echo 'develop'
        //             } else  if (env.BRANCH_NAME == 'release') {
        //                 echo 'release'
        //             }
        //         }
        //     }
        // }
        }
    }
def DeployViaPassword(CREDENTIAL_NAME, HOST, SH_FILENAME, SERVER_WORKING_DIR, LOCAL_BUILD_DIR, STATIC_DEPLOY_DIR, BACKUP_DEPLOY_DIR, IS_BACKUP, MAX_BACKUP_VERSION, VERSION_FILENAME){
    withCredentials([usernamePassword(credentialsId: "${CREDENTIAL_NAME}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
        script {
            def remote = [name: USERNAME, host: "${HOST}", user: USERNAME, password: PASSWORD, allowAnyHosts: true]
            sshPut remote: remote, from: "${SH_FILENAME}", into: "${SERVER_WORKING_DIR}" // send deploy instruction sh file to remote server
            sshPut remote: remote, from: "${LOCAL_BUILD_DIR}", into: "${SERVER_WORKING_DIR}" // send built files to remote server
            sshCommand remote: remote, command: "sh ${SERVER_WORKING_DIR}/${SH_FILENAME} ${SERVER_WORKING_DIR} ${LOCAL_BUILD_DIR} ${STATIC_DEPLOY_DIR} ${BACKUP_DEPLOY_DIR} ${IS_BACKUP} ${MAX_BACKUP_VERSION} ${VERSION_FILENAME}" // run deploy instruction .sh file on remote server
            sshCommand remote: remote, command: "rm ${SERVER_WORKING_DIR}/${SH_FILENAME}" // remove deploy instruction sh file from remote server
        }
    }
}

def DeployViaKeypem(CREDENTIAL_NAME, HOST, SH_FILENAME, SERVER_WORKING_DIR, LOCAL_BUILD_DIR, STATIC_DEPLOY_DIR, BACKUP_DEPLOY_DIR, IS_BACKUP, MAX_BACKUP_VERSION, VERSION_FILENAME){
    withCredentials([sshUserPrivateKey(credentialsId: "${CREDENTIAL_NAME}", usernameVariable: 'USERNAME', keyFileVariable: 'IDENTITY', passphraseVariable: 'PassPhrase')]){
        script {
            def remote = [name: USERNAME, host: "${HOST}", user: USERNAME, identityFile: IDENTITY, allowAnyHosts: true]
            sshPut remote: remote, from: "${SH_FILENAME}", into: "${SERVER_WORKING_DIR}" // send deploy instruction sh file to remote server
            sshPut remote: remote, from: "${LOCAL_BUILD_DIR}", into: "${SERVER_WORKING_DIR}" // send built files to remote server
            sshCommand remote: remote, command: "sh ${SERVER_WORKING_DIR}/${SH_FILENAME} ${SERVER_WORKING_DIR} ${LOCAL_BUILD_DIR} ${STATIC_DEPLOY_DIR} ${BACKUP_DEPLOY_DIR} ${IS_BACKUP} ${MAX_BACKUP_VERSION} ${VERSION_FILENAME}" // run deploy instruction .sh file on remote server
            sshCommand remote: remote, command: "rm ${SERVER_WORKING_DIR}/${SH_FILENAME}" // remove deploy instruction sh file from remote server
        }
    }
}

def GetCommitParams(index){
    commit = sh(returnStdout: true, script: 'git log --pretty=format:%B -n 1').trim()
    List commitlines = commit.split('\n')
    List commitCommand = (commitlines.getAt(0)).split(' ')
    return commitCommand.getAt(index)
}