pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/imenthmayni/DevOps.git'
            }
        }

        stage('Build') {
            steps {
                sh './build.sh'  
            }
        }

        stage('Test') {
            steps {
                sh './run-tests.sh'  
            }
        }

        stage('Deploy') {
            steps {
                sh './deploy.sh'  
            }
        }
    }
}
   
