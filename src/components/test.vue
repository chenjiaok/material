<template>
  <div>
    <input type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" value="更改物料">
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel" v-for="item in materials" v-bind:key="item.code">{{ item.code }}</h4>
          </div>
          <div class="modal-body">
            <ul>
              <li><input type="text" value="item.name"></li>
              <li><input type="text" value="item.count"></li>
              <li><input type="text" value="item.supplier"></li>
              <li><input type="text" value="item.spn"></li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
   
    <script>
    
    this.$http.delete('/material/findall').then((res) => {
        console.log('end put',res.data)
        

    })
/*
$(function() {
    $('#myModal').on('hide.bs.modal',
    function() {
        alert('确认保存修改数据');
    })
});*/

    this.$http.put('/material/detail').then((res) => {
        console.log(JSON.stringify(res.data))
        console.log(JSON.stringify(this.materials))
        
      }) 
    </script> 