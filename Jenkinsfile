pipeline {
    agent any
    tools {
        maven 'M2_HOME'  
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/imenthmayni/DevOps.git'
            }
        }
        stage('Build') {
            steps {
                dir('TechOps') {
                    sh 'mvn clean install'
                }
            }
        }
        stage('Test') {
            steps {
                dir('TechOps') { 
                    sh 'mvn test'
                }
            }
        }
    }
    post {
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Build or tests failed!'
        }
    }
}
