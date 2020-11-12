<script>
  import { Console } from "console";

  import Mustache from "mustache";

  export let templateBody;
  export let templateSubj;
  export let body;
  export let subject;
  export function loadTemplateBody() {
    templateBody = `name: {{name}}
    body: {{body}}`;
    templateSubj = `Subject: {{Subject}}`;
    return (body = Mustache.render(templateBody, {
      name: "{name}",
      body: "hello thanks for reaching out to our company",
    }));
  }
  export function loadTemplateSubject() {
    templateSubj = `Subject: {{Subject}}`;
    subject = Mustache.render(templateSubj, {
      Subject: "Thank you Email",
    });
  }
  console.log("am i here ", templateSubj);
  loadTemplateSubject();
  loadTemplateBody();
</script>
