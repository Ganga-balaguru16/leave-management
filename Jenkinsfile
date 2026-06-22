pipeline {
agent any

```
stages {
    stage('Checkout') {
        steps {
            echo 'Source code checked out'
        }
    }

    stage('Build') {
        steps {
            dir('backend') {
                bat 'mvn clean compile'
            }
        }
    }

    stage('Test') {
        steps {
            dir('backend') {
                bat 'mvn test'
            }
        }
    }

    stage('Package') {
        steps {
            dir('backend') {
                bat 'mvn clean package'
            }
        }
    }
}
```

}
