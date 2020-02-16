<?php

namespace AppBundle\Controller;

use AppBundle\Form\SearchTypeEN;
use AppBundle\Form\TimeType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/tech")
 */
class TechController extends BaseController
{
    /**
     * @Route("/", name="tech")
     */
    public function indexAction(Request $request)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findAllSorted('Tech', $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('tech/index.html.twig', [
            'items' => $items
        ]);
    }

    /**
     * @Route("/source/{source}", name="tech_source")
     */
    public function sourceAction(Request $request, $source)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findBySource($source, $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('tech/index.html.twig', [
            'items' => $items,
            'date' => $this->getFilterDate()
        ]);
    }

    public function searchFormAction()
    {
        $form = $this->createForm(SearchTypeEN::class,
            array(
                'action' => $this->generateUrl('search'),
                'method' => 'POST',
            )
        );

        return $this->render('search/_formEN.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/search", name="search")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function searchAction(Request $request)
    {
        $form = $this->createForm(SearchTypeEN::class,
            array(
                'action' => $this->generateUrl('search'),
                'method' => 'POST',
            ));

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();
            $search = $data['title'];
            $request->getSession()->set('_search', $search);

            $items = $this->get('doctrine_mongodb')
                ->getRepository('AppBundle:Article')
                ->findByTitleAndCategory($this->getSearchQuery(), 'Tech', $this->getNumberOfArticles(), $this->getFilterDate());

            return $this->render('tech/search.html.twig', [
                'items' => $items,
                'search' => $search
            ]);
        }

        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findByTitleAndCategory($this->getSearchQuery(), 'Tech', $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('tech/search.html.twig', [
            'items' => $items,
            'search' => $this->getSearchQuery()
        ]);
    }

    public function dateFormAction()
    {
        $form = $this->createForm(TimeType::class,
            array(
                'action' => $this->generateUrl('timemachine'),
                'method' => 'POST',
            )
        );

        return $this->render('search/_dateEN.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/settings/{no}", name="number_of_articles")
     */
    public function numberOfArticlesAction(Request $request, $no)
    {
        $request->getSession()->set('_article_no', $no);

        $referer = $request->headers->get('referer');

        if (empty($referer)) {
            throw $this->createNotFoundException('referer_not_found');
        }

        return $this->redirect($referer);
    }

    /**
     * @Route("/timemachine", name="timemachine")
     * @Method({"POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function dateAction(Request $request)
    {
        $form = $this->createForm(TimeType::class)
            ->add('submit', SubmitType::class)
            ->add('reset', SubmitType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if($form->get('reset')->isClicked()) {
                $request->getSession()->set('_date', null);
            } else {
                $data = $form->getData();
                $date = $data['date'];

                if ($date) {
                    $request->getSession()->set('_date', $date);
                }
            }

        }

        $referer = $request->headers->get('referer');

        if (empty($referer)) {
            throw $this->createNotFoundException('referer_not_found');
        }

        return $this->redirect($referer);
    }
}
