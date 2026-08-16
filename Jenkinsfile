pipeline {
    agent any

    environment {
        REGISTRY = '192.168.56.30:5000'
        IMAGE = 'static-site'
        GIT_CREDENTIALS = 'github-credentials'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Generate Image Tag') {
            steps {
                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Building image: ${REGISTRY}/${IMAGE}:${IMAGE_TAG}"
                }
            }
        }

        stage('Build Image') {
            steps {
                sh '''
                    docker build \
                      -t ${REGISTRY}/${IMAGE}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                    docker push \
                      ${REGISTRY}/${IMAGE}:${IMAGE_TAG}
                '''
            }
        }

        stage('Update GitOps Manifest') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-credentials',
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_PASSWORD'
                    )
                ]) {
                    sh '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@localhost"

                        git fetch origin staging
                        git checkout staging
                        git reset --hard origin/staging

                        sed -i "s#image: ${REGISTRY}/${IMAGE}:.*#image: ${REGISTRY}/${IMAGE}:${IMAGE_TAG}#" k8s/staging/deployment.yaml

                        git add k8s/staging/deployment.yaml

                        git commit -m "Update staging image to ${IMAGE_TAG}" || true

                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/skyworknav/web-test-jenkins.git HEAD:staging
                    '''
                }
            }
        }

    }
}