<!-- routify:options title="Templates" -->
<script>
  import Mustache from "mustache";
  let templateBody;
  let templateSubj;
  export let outputSubject;
  export let outputBody;
  console.log("subject", outputSubject);
  console.log("body", outputBody);

  templateBody = `name: {{name}}
    body: {{body}}`;
  templateSubj = `Subject: {{Subject}}`;
  outputBody = Mustache.render(templateBody, {
    name: "{name}",
    body: "hello thanks for reaching out to our company",
  });

  templateSubj = `Subject: {{Subject}}`;
  outputSubject = Mustache.render(templateSubj, {
    Subject: "Thank you Email",
  });
</script>

<style>
  .container-fluid {
    display: flex;
    justify-content: space-around;
  }
  textarea {
    width: 400px;
  }
  .box {
    width: 400px;
    height: 250px;
  }
</style>

<!-- routify:options index=3 -->
<div class="container-fluid">
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email Subject</label>
      <input
        bind:value={outputSubject}
        type="text"
        class="form-control input-lg"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter Template Subject" />
      <small id="emailHelp" class="form-text text-muted">Create custom email
        subjects here.</small>
    </div>
    <div class="form-group">
      <label for="body">Body</label>
      <div class="form-group">
        <textarea
          bind:value={outputBody}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="10" />
      </div>
    </div>
    <div class="form-group form-check" />
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <div class="box" />
</div>
