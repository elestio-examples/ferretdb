# FerretDB CI/CD pipeline

<a href="https://dash.elest.io/deploy?source=cicd&social=dockerCompose&url=https://github.com/elestio-examples/ferretdb"><img src="deploy-on-elestio.png" alt="Deploy on Elest.io" width="180px" /></a>

Deploy FerretDB server with CI/CD on Elestio

<img src="ferretdb.jpg" style='width: 100%;'/>
<br/>
<br/>

# Once deployed ...

You can open Mongo express web UI here:

    URL: https://[CI_CD_DOMAIN]
    Login: [ADMIN_EMAIL]
    password: [ADMIN_PASSWORD]

# Using FerretDB

FerretDB is a powerful database solution that allows you to seamlessly integrate MongoDB-like functionality into your applications while utilizing PostgreSQL as the underlying database engine.

## Connection URI

Once deployed, you'll receive a connection URI. This URI resembles the format used for MongoDB connections but points to your FerretDB instance. An example URI looks like this:

    "mongodb://postgres:[ADMIN_PASSWORD]@[CI_CD_DOMAIN]/ferretdb?authMechanism=PLAIN"

## CRUD Example

In your FerretDB repository, you'll find a comprehensive CRUD example in javascript located at `example/crud.js`. This example demonstrates how to perform basic CRUD (Create, Read, Update, Delete) operations using FerretDB. You can refer to this example to understand how to interact with FerretDB within your applications.
