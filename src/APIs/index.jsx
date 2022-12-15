import { createServer, Response, Model } from 'miragejs'

export const setupServer = ()=> {
    let server = createServer({
        models: {
            todos: Model
        },
        routes() {
            this.namespace = "api"    
    
            // Using the `timing` option to slow down the response
            this.get("/todos", (schema) => {
                return schema.todos.all()
            })
    
            // Responding to a POST request
            this.post("/addTodo", (schema, request) => {
                let payload = JSON.parse(request.requestBody)
        
                return schema.todos.create(payload)
            })
    
            // Update status of Todo Item
            this.post('/updateTodo', (schema, request) => {
                let id = JSON.parse(request.requestBody)
                const currentTodo = schema.todos.find(id)            
                currentTodo.update({completed: !currentTodo.completed})     
                return currentTodo       
            })
    
             // Using the `Response` class to return a 500
            this.delete("/delete/1", () => {
                let headers = {}
                let data = { errors: ["Server did not respond"] }
        
                return new Response(500, headers, data)
            })
          },
      })
}